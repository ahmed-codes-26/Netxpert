import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const TAU = Math.PI * 2
const START = -Math.PI / 2

// ---- Mesh settings: tweak these to reshape the network ----
const SEED = 11      // change to any number for a different random layout
const RING = 14      // devices on the circular boundary (keep 6 or more)
const INNER = 12     // inner devices to try to place (the core is one of them)
const INNER_R = 0.68 // how far from the center inner devices may sit (0–1)
const DMIN = 0.3     // minimum spacing between inner devices
const CHORDS = 3     // random long links across the circle

const INNER_ROLES = [
  ['firewall', 'Firewall'],
  ['router', 'Edge Router'],
  ['router', 'Edge Router'],
  ['switch', 'Core Switch'],
  ['switch', 'Core Switch'],
  ['server', 'Storage Node'],
]

// Small seeded random generator so the layout is the same on every load
function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildMesh() {
  const rand = rng(SEED)
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]

  // 1. inner devices: core in the center plus a random scatter
  const pts = [{ x: 0, y: 0 }]
  let tries = 0
  while (pts.length < INNER && tries < 8000) {
    tries++
    const r = INNER_R * Math.sqrt(rand())
    const a = rand() * TAU
    const p = { x: r * Math.cos(a), y: r * Math.sin(a) }
    if (pts.every((q) => Math.hypot(p.x - q.x, p.y - q.y) >= DMIN)) pts.push(p)
  }
  const M = pts.length

  // 2. boundary devices on a perfect circle
  for (let j = 0; j < RING; j++) {
    const ang = START + (j / RING) * TAU
    pts.push({ x: Math.cos(ang), y: Math.sin(ang), ang, edge: true })
  }

  const dist = (a, b) => Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y)
  const edges = new Map()
  const add = (a, b, arc = false) => {
    if (a === b) return
    const key = Math.min(a, b) + '-' + Math.max(a, b)
    if (!edges.has(key)) edges.set(key, { a, b, arc })
  }
  const nearestInner = (i) =>
    Array.from({ length: M }, (_, n) => n)
      .filter((j) => j !== i)
      .sort((x, y) => dist(i, x) - dist(i, y))

  // 3. the circular boundary line (one arc between each pair of neighbours)
  for (let j = 0; j < RING; j++) add(M + j, M + ((j + 1) % RING), true)

  // 4. random links between inner devices
  for (let i = 0; i < M; i++) {
    const pool = nearestInner(i).slice(0, i === 0 ? 6 : 4)
    const want = i === 0 ? 4 : 2
    for (let n = 0; n < want && pool.length; n++) {
      add(i, pool.splice(Math.floor(rand() * pool.length), 1)[0])
    }
  }

  // 5. each boundary device links to a random nearby inner device
  for (let j = 0; j < RING; j++) {
    const b = M + j
    const pool = nearestInner(b).slice(0, 3)
    add(b, pick(pool))
    if (rand() < 0.4) add(b, pick(pool))
  }

  // 6. a few random long links across the circle
  for (let c = 0; c < CHORDS; c++) {
    const j = Math.floor(rand() * RING)
    const k = (j + 3 + Math.floor(rand() * (RING - 5))) % RING
    add(M + j, M + k)
  }

  // 7. make sure the whole mesh is one connected network
  const parent = pts.map((_, i) => i)
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])))
  edges.forEach(({ a, b }) => { parent[find(a)] = find(b) })
  for (;;) {
    let best = null
    for (let a = 0; a < pts.length; a++) {
      for (let b = a + 1; b < pts.length; b++) {
        if (find(a) !== find(b) && (!best || dist(a, b) < best.d)) {
          best = { a, b, d: dist(a, b) }
        }
      }
    }
    if (!best) break
    add(best.a, best.b)
    parent[find(best.a)] = find(best.b)
  }
  const links = [...edges.values()]

  // 8. roles: inner devices by connectivity, boundary devices mostly endpoints
  const deg = pts.map(() => 0)
  links.forEach(({ a, b }) => { deg[a]++; deg[b]++ })

  const nodes = pts.map((p) => ({ hx: p.x, hy: p.y, edge: !!p.edge, ang: p.ang }))
  nodes[0] = { ...nodes[0], type: 'server', label: 'Core Data Center', big: true }

  const innerIds = Array.from({ length: M - 1 }, (_, n) => n + 1)
    .sort((a, b) => deg[b] - deg[a] || a - b)
  innerIds.forEach((id, n) => {
    const role = INNER_ROLES[n % INNER_ROLES.length]
    nodes[id] = { ...nodes[id], type: role[0], label: role[1] }
  })
  for (let j = 0; j < RING; j++) {
    const tower = rand() < 0.35
    nodes[M + j] = {
      ...nodes[M + j],
      type: tower ? 'tower' : 'pc',
      label: tower ? 'Telecom Site' : 'Workstation',
    }
  }

  return { nodes, links }
}

const { nodes: NODES, links: LINKS } = buildMesh()
const NEIGH = NODES.map(() => [])
const LINK_OF = {}
LINKS.forEach((l) => {
  NEIGH[l.a].push(l.b)
  NEIGH[l.b].push(l.a)
  LINK_OF[l.a + '-' + l.b] = l
  LINK_OF[l.b + '-' + l.a] = l
})

// Line icons drawn in a 24x24 box centered on (0,0)
const ICONS = {
  server(ctx) {
    for (let i = 0; i < 3; i++) {
      const y = -10 + i * 7
      ctx.beginPath(); ctx.roundRect(-9, y, 18, 5.5, 1.2); ctx.stroke()
      ctx.beginPath(); ctx.arc(-5.5, y + 2.75, 0.9, 0, TAU); ctx.fill()
      ctx.beginPath(); ctx.moveTo(0, y + 2.75); ctx.lineTo(5.5, y + 2.75); ctx.stroke()
    }
  },
  pc(ctx) {
    ctx.beginPath(); ctx.roundRect(-10, -9, 20, 13, 1.8); ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, 4); ctx.lineTo(0, 8)
    ctx.moveTo(-4.5, 8.5); ctx.lineTo(4.5, 8.5)
    ctx.stroke()
  },
  router(ctx) {
    ctx.beginPath(); ctx.roundRect(-10, 1, 20, 8, 1.8); ctx.stroke()
    ctx.beginPath(); ctx.arc(-5.5, 5, 0.9, 0, TAU); ctx.fill()
    ctx.beginPath(); ctx.arc(-2, 5, 0.9, 0, TAU); ctx.fill()
    ctx.beginPath()
    ctx.moveTo(-6, 1); ctx.lineTo(-9, -9)
    ctx.moveTo(6, 1); ctx.lineTo(9, -9)
    ctx.stroke()
  },
  switch(ctx) {
    ctx.beginPath(); ctx.roundRect(-11, -5, 22, 10, 1.8); ctx.stroke()
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.roundRect(-8.2 + i * 3.7, -1.8, 2.4, 4, 0.5); ctx.stroke()
    }
  },
  firewall(ctx) {
    ctx.beginPath()
    ctx.moveTo(0, -10); ctx.lineTo(8.5, -6.5); ctx.lineTo(8.5, 0)
    ctx.quadraticCurveTo(8.5, 7, 0, 10)
    ctx.quadraticCurveTo(-8.5, 7, -8.5, 0)
    ctx.lineTo(-8.5, -6.5); ctx.closePath(); ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(-3.5, 0); ctx.lineTo(-0.8, 3); ctx.lineTo(4, -3)
    ctx.stroke()
  },
  tower(ctx) {
    ctx.beginPath()
    ctx.moveTo(0, -3); ctx.lineTo(-5.5, 10)
    ctx.moveTo(0, -3); ctx.lineTo(5.5, 10)
    ctx.moveTo(-2.5, 3); ctx.lineTo(2.5, 3)
    ctx.moveTo(-4, 6.5); ctx.lineTo(4, 6.5)
    ctx.stroke()
    ctx.beginPath(); ctx.arc(0, -5, 1.2, 0, TAU); ctx.fill()
    ctx.beginPath(); ctx.arc(0, -5, 4, -Math.PI * 0.85, -Math.PI * 0.15); ctx.stroke()
    ctx.beginPath(); ctx.arc(0, -5, 7, -Math.PI * 0.85, -Math.PI * 0.15); ctx.stroke()
  },
}

const PULL = 190 // how far the cursor's pull reaches (px)

export default function NetworkBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const mouse = { x: -9999, y: -9999 }
    let w = 0, h = 0, k = 1, cx = 0, cy = 0, R = 0, frame = 0, raf
    let nodes = [], packets = [], hovered = -1

    // GSAP Intro Bloom Object
    const intro = { scale: reduce ? 1 : 0.35, opacity: reduce ? 1 : 0 }
    let introTween = null
    if (!reduce) {
      introTween = gsap.to(intro, {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
        onComplete: () => {
          burst(0, 3)
        },
      })
    }

    const tileSize = (n) => (n.big ? 58 : 44) * k

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent.clientWidth || window.innerWidth
      h = parent.clientHeight || window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (w < 768) {
        // Mobile screens (< 768px): subtle backdrop layered only behind upper text area
        k = 0.68
        cx = w * 0.5
        cy = Math.min(h * 0.26, 140)
        R = Math.min(w * 0.36, 135)
      } else if (w < 1024) {
        // Tablet screens (768px – 1024px): side-by-side without overlapping left text
        k = 0.80
        cx = w * 0.80
        cy = h * 0.44
        R = Math.min(w * 0.19, (h - 90) * 0.36, 180)
      } else if (w < 1440) {
        // Standard Desktop / Laptops (1024px – 1440px): side-by-side with clear middle space
        k = 0.95
        cx = w * 0.76
        cy = h * 0.44
        R = Math.min(w * 0.23, (h - 100) * 0.40, 265)
      } else {
        // Wide Desktop screens (≥ 1440px): anchored to max-w-7xl right column
        k = 1
        cx = w * 0.5 + 400
        cy = h * 0.44
        R = Math.min((h - 110) * 0.40, 275)
      }

      nodes = NODES.map((n, i) => ({
        ...n, p1: i * 2.1, p2: i * 1.3 + 1, ox: 0, oy: 0, s: 1, flash: 0,
      }))
      packets = []
    }

    // boundary devices stay fixed on the circle; inner devices float
    const pos = (n, t) => {
      const activeR = R * intro.scale
      const floatY = reduce ? 0 : Math.sin(t / 2000) * 7
      if (n.edge) return { x: cx + n.hx * activeR, y: cy + floatY + n.hy * activeR }
      const A = reduce ? 0 : 7 * k
      return {
        x: cx + n.hx * activeR + Math.sin(t / 1700 + n.p1) * A + n.ox,
        y: cy + floatY + n.hy * activeR + Math.cos(t / 1900 + n.p2) * A + n.oy,
      }
    }

    const packetPoint = (p, P, t) => {
      const activeR = R * intro.scale
      const floatY = reduce ? 0 : Math.sin(t / 2000) * 7
      const l = LINK_OF[p.a + '-' + p.b]
      if (l.arc) {
        const f = p.a === l.a ? p.t : 1 - p.t
        const th = nodes[l.a].ang + (TAU / RING) * f
        return { x: cx + activeR * Math.cos(th), y: cy + floatY + activeR * Math.sin(th) }
      }
      const A = P[p.a], B = P[p.b]
      return { x: A.x + (B.x - A.x) * p.t, y: A.y + (B.y - A.y) * p.t }
    }

    const burst = (i, ttl) => {
      nodes[i].flash = 1
      for (const j of NEIGH[i]) packets.push({ a: i, b: j, t: 0, ttl })
    }

    const drawTile = (x, y, size, n, hot) => {
      ctx.save()
      ctx.translate(x, y)

      ctx.fillStyle = '#051838'
      ctx.beginPath()
      ctx.roundRect(-size / 2, -size / 2, size, size, size * 0.28)
      ctx.fill()

      ctx.lineWidth = 1.2
      ctx.strokeStyle = hot > 0.05 ? `rgba(250,1,1,${0.5 + 0.5 * hot})` : '#152A50'
      ctx.stroke()

      ctx.scale((size * 0.55) / 24, (size * 0.55) / 24)
      ctx.lineWidth = 1.7
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = ctx.fillStyle = hot > 0.05 ? '#FA0101' : '#94A3B8'
      ICONS[n.type](ctx)
      ctx.restore()
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = intro.opacity

      const activeR = R * intro.scale
      const floatY = reduce ? 0 : Math.sin(t / 2000) * 7

      // inner devices lean toward the cursor
      if (!reduce) {
        for (const n of nodes) {
          if (n.edge) continue
          const dx = mouse.x - (cx + n.hx * activeR)
          const dy = mouse.y - (cy + floatY + n.hy * activeR)
          const d = Math.hypot(dx, dy)
          let tx = 0, ty = 0
          if (d < PULL && d > 1) {
            const s = (1 - d / PULL) * 16 * k
            tx = (dx / d) * s
            ty = (dy / d) * s
          }
          n.ox += (tx - n.ox) * 0.08
          n.oy += (ty - n.oy) * 0.08
        }
      }
      const P = nodes.map((n) => pos(n, t))

      // soft glow behind the mesh
      const g = ctx.createRadialGradient(cx, cy + floatY, 0, cx, cy + floatY, activeR * 1.1)
      g.addColorStop(0, 'rgba(250,1,1,0.14)')
      g.addColorStop(0.7, 'rgba(250,1,1,0.03)')
      g.addColorStop(1, 'rgba(250,1,1,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy + floatY, activeR * 1.1, 0, TAU)
      ctx.fill()

      // links: circular arcs on the boundary, straight lines elsewhere
      for (const l of LINKS) {
        const lit = hovered >= 0 && (l.a === hovered || l.b === hovered)
        ctx.strokeStyle = lit ? 'rgba(250,1,1,0.85)' : 'rgba(255,255,255,0.12)'
        ctx.lineWidth = lit ? 2 : l.arc ? 1.5 : 1.2
        ctx.beginPath()
        if (l.arc) {
          const a0 = nodes[l.a].ang
          ctx.arc(cx, cy + floatY, activeR, a0, a0 + TAU / RING)
        } else {
          ctx.moveTo(P[l.a].x, P[l.a].y)
          ctx.lineTo(P[l.b].x, P[l.b].y)
        }
        ctx.stroke()
      }

      // ambient traffic so the network is always alive
      if (!reduce) {
        if (frame % 35 === 0) {
          const l = LINKS[Math.floor(Math.random() * LINKS.length)]
          packets.push(Math.random() < 0.5
            ? { a: l.a, b: l.b, t: 0, ttl: 1 }
            : { a: l.b, b: l.a, t: 0, ttl: 1 })
        }
        if (frame % 300 === 150) burst(Math.floor(Math.random() * nodes.length), 3)
      }

      // advance packets, forward them when they arrive
      const arrived = []
      packets = packets.filter((p) => {
        p.t += 0.02
        if (p.t >= 1) { arrived.push(p); return false }
        return true
      })
      for (const p of arrived) {
        nodes[p.b].flash = 1
        if (p.ttl > 0) {
          for (const j of NEIGH[p.b]) {
            if (j !== p.a && packets.length < 90) {
              packets.push({ a: p.b, b: j, t: 0, ttl: p.ttl - 1 })
            }
          }
        }
      }

      // draw packets
      ctx.fillStyle = '#FA0101'
      for (const p of packets) {
        const pt = packetPoint(p, P, t)
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 3, 0, TAU)
        ctx.fill()
      }

      // device tiles
      nodes.forEach((n, i) => {
        const isHover = i === hovered
        const isNeighbor = hovered >= 0 && NEIGH[hovered].includes(i)
        n.s += ((isHover ? 1.14 : 1) - n.s) * 0.18
        n.flash *= 0.94
        const hot = Math.max(isHover ? 1 : 0, isNeighbor ? 0.4 : 0, n.flash)
        drawTile(P[i].x, P[i].y, tileSize(n) * n.s, n, hot)
      })

      // label for hovered device
      if (hovered >= 0) {
        const n = nodes[hovered]
        const { x, y } = P[hovered]
        ctx.font = '600 12px Manrope, sans-serif'
        const tw = ctx.measureText(n.label).width + 20
        const ty = y + (tileSize(n) * 1.14) / 2 + 8
        ctx.fillStyle = '#051838'
        ctx.strokeStyle = '#152A50'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(x - tw / 2, ty, tw, 24, 8)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(n.label, x, ty + 12)
      }
      ctx.globalAlpha = 1
    }

    const hit = () => {
      const now = performance.now()
      let found = -1
      nodes.forEach((n, i) => {
        const p = pos(n, now)
        const half = tileSize(n) / 2 + 6
        if (Math.abs(mouse.x - p.x) < half && Math.abs(mouse.y - p.y) < half) found = i
      })
      return found
    }

    const setMouse = (e) => {
      const r = parent.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onMove = (e) => {
      setMouse(e)
      const i = hit()
      if (i !== hovered) {
        hovered = i
        parent.style.cursor = i >= 0 ? 'pointer' : ''
        if (i >= 0) burst(i, 2)
      }
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
      hovered = -1
      parent.style.cursor = ''
    }
    const onDown = (e) => {
      setMouse(e)
      const i = hit()
      if (i >= 0) { hovered = i; burst(i, 4) }
    }
    const onResize = () => { layout(); if (reduce) draw(0) }

    let isVisible = true
    const loop = (t) => {
      if (!isVisible) return
      draw(t)
      frame++
      raf = requestAnimationFrame(loop)
    }

    layout()
    if (reduce) draw(0)
    else {
      raf = requestAnimationFrame(loop)
      parent.addEventListener('pointermove', onMove)
      parent.addEventListener('pointerleave', onLeave)
      parent.addEventListener('pointerdown', onDown)
    }
    window.addEventListener('resize', onResize)

    // ResizeObserver for reliable dimension sync across load and layout changes
    let ro = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        layout()
        if (reduce) draw(0)
      })
      ro.observe(parent)
    }

    // Pause animation when scrolled offscreen to guarantee 120fps native scroll
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible && !raf && !reduce) {
        raf = requestAnimationFrame(loop)
      } else if (!isVisible && raf) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }, { threshold: 0.05 })
    observer.observe(parent)

    return () => {
      if (introTween) introTween.kill()
      if (ro) ro.disconnect()
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
      parent.removeEventListener('pointerdown', onDown)
      window.removeEventListener('resize', onResize)
      parent.style.cursor = ''
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block opacity-30 md:opacity-100 transition-opacity duration-300"
      aria-hidden="true"
    />
  )
}