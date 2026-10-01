import { useEffect, useRef } from 'react'

const TAU = Math.PI * 2
const START = -Math.PI / 2 // first device sits at the top

// Inner ring: each device connects to the core
const RING1 = [
  ['firewall', 'Firewall'],
  ['router', 'Edge Router'],
  ['switch', 'Core Switch'],
  ['server', 'Storage Node'],
  ['switch', 'Core Switch'],
  ['router', 'Edge Router'],
]

// Outer ring: PER devices hang off each inner device, in pairs
const RING2 = [
  ['tower', 'Telecom Site'], ['tower', 'Telecom Site'], // firewall
  ['tower', 'Telecom Site'], ['pc', 'Workstation'],     // router
  ['pc', 'Workstation'], ['pc', 'Workstation'],         // switch
  ['pc', 'Workstation'], ['pc', 'Workstation'],         // storage
  ['pc', 'Workstation'], ['pc', 'Workstation'],         // switch
  ['pc', 'Workstation'], ['tower', 'Telecom Site'],     // router
]

const N1 = RING1.length
const N2 = RING2.length
const PER = N2 / N1 // must be a whole number
const RING_N = [1, N1, N2]

const NODES = [
  { type: 'server', label: 'Core Data Center', ring: 0, big: true },
  ...RING1.map(([type, label], i) => ({
    type, label, ring: 1, base: START + (i / N1) * TAU,
  })),
  ...RING2.map(([type, label], i) => ({
    type, label, ring: 2,
    base: START + (i / N2) * TAU - ((PER - 1) / 2) * (TAU / N2),
  })),
]

const LINKS = []
for (let i = 0; i < N1; i++) {
  LINKS.push({ a: 0, b: 1 + i }) // spoke
  LINKS.push({ a: 1 + i, b: 1 + ((i + 1) % N1), arc: 1 }) // inner ring
  for (let k = 0; k < PER; k++) {
    LINKS.push({ a: 1 + i, b: 1 + N1 + i * PER + k }) // inner -> outer
  }
}
for (let j = 0; j < N2; j++) {
  LINKS.push({ a: 1 + N1 + j, b: 1 + N1 + ((j + 1) % N2), arc: 2 }) // outer ring
}

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

export default function NetworkBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const mouse = { x: -9999, y: -9999 }
    let w = 0, h = 0, k = 1, cx = 0, cy = 0, R = [0, 0, 0]
    let rot = 0, spin = 1, frame = 0, raf
    let nodes = [], packets = [], hovered = -1

    const tileSize = (n) => (n.big ? 58 : 44) * k

    const layout = () => {
      const dpr = window.devicePixelRatio || 1
      const r = parent.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const mobile = w < 768
      k = mobile ? 0.75 : 1
      cx = mobile ? w * 0.5 : w * 0.7
      cy = h * 0.5
      const maxR = mobile ? Math.min(w * 0.4, h * 0.36) : Math.min(h * 0.4, w * 0.27)
      R = [0, maxR * 0.5, maxR]

      nodes = NODES.map((n, i) => ({ ...n, phase: i * 1.7, s: 1, flash: 0 }))
      packets = []
    }

    const pos = (n, t) => {
      const bob = reduce ? 0 : Math.sin(t / 900 + n.phase) * 2
      if (n.ring === 0) return { x: cx, y: cy + bob }
      const a = n.base + rot
      return { x: cx + R[n.ring] * Math.cos(a), y: cy + R[n.ring] * Math.sin(a) + bob }
    }

    const packetPoint = (p, P) => {
      const l = LINK_OF[p.a + '-' + p.b]
      if (l.arc) {
        const step = TAU / RING_N[l.arc]
        const f = p.a === l.a ? p.t : 1 - p.t
        const th = nodes[l.a].base + rot + step * f
        return { x: cx + R[l.arc] * Math.cos(th), y: cy + R[l.arc] * Math.sin(th) }
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

      ctx.shadowColor = hot > 0.05 ? `rgba(217,30,30,${0.35 * hot})` : 'rgba(0,0,0,0.08)'
      ctx.shadowBlur = hot > 0.05 ? 18 : 10
      ctx.shadowOffsetY = 3
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.roundRect(-size / 2, -size / 2, size, size, size * 0.28)
      ctx.fill()

      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0
      ctx.lineWidth = 1.2
      ctx.strokeStyle = hot > 0.05 ? `rgba(217,30,30,${0.4 + 0.6 * hot})` : '#E6E6E6'
      ctx.stroke()

      ctx.scale((size * 0.55) / 24, (size * 0.55) / 24)
      ctx.lineWidth = 1.7
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = ctx.fillStyle = hot > 0.05 ? '#D91E1E' : '#6B6B6B'
      ICONS[n.type](ctx)
      ctx.restore()
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)

      // slow rotation, easing to a stop while a device is hovered
      if (!reduce) {
        spin += ((hovered >= 0 ? 0 : 1) - spin) * 0.06
        rot += 0.0006 * spin
      }
      const P = nodes.map((n) => pos(n, t))

      // faint rotating orbit
      ctx.setLineDash([3, 9])
      ctx.lineDashOffset = -rot * R[2] * 1.22
      ctx.strokeStyle = '#E3E6EB'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(cx, cy, R[2] * 1.22, 0, TAU)
      ctx.stroke()
      ctx.setLineDash([])

      // links (straight spokes, curved ring arcs)
      for (const l of LINKS) {
        const lit = hovered >= 0 && (l.a === hovered || l.b === hovered)
        ctx.strokeStyle = lit ? 'rgba(217,30,30,0.85)' : '#D5D8DE'
        ctx.lineWidth = lit ? 2 : 1.2
        ctx.beginPath()
        if (l.arc) {
          const a0 = nodes[l.a].base + rot
          ctx.arc(cx, cy, R[l.arc], a0, a0 + TAU / RING_N[l.arc])
        } else {
          ctx.moveTo(P[l.a].x, P[l.a].y)
          ctx.lineTo(P[l.b].x, P[l.b].y)
        }
        ctx.stroke()
      }

      // ambient traffic so the network is always alive
      if (!reduce) {
        if (frame % 40 === 0) {
          const l = LINKS[Math.floor(Math.random() * LINKS.length)]
          packets.push(Math.random() < 0.5
            ? { a: l.a, b: l.b, t: 0, ttl: 1 }
            : { a: l.b, b: l.a, t: 0, ttl: 1 })
        }
        if (frame % 360 === 180) burst(Math.floor(Math.random() * nodes.length), 3)
      }

      // advance packets, forward them when they arrive
      const arrived = []
      packets = packets.filter((p) => {
        p.t += 0.018
        if (p.t >= 1) { arrived.push(p); return false }
        return true
      })
      for (const p of arrived) {
        nodes[p.b].flash = 1
        if (p.ttl > 0) {
          for (const j of NEIGH[p.b]) {
            if (j !== p.a && packets.length < 80) {
              packets.push({ a: p.b, b: j, t: 0, ttl: p.ttl - 1 })
            }
          }
        }
      }

      // draw packets
      ctx.fillStyle = '#D91E1E'
      ctx.shadowColor = 'rgba(217,30,30,0.6)'
      ctx.shadowBlur = 10
      for (const p of packets) {
        const pt = packetPoint(p, P)
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 3, 0, TAU)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // device tiles
      nodes.forEach((n, i) => {
        const isHover = i === hovered
        n.s += ((isHover ? 1.14 : 1) - n.s) * 0.18
        n.flash *= 0.94
        drawTile(P[i].x, P[i].y, tileSize(n) * n.s, n, Math.max(isHover ? 1 : 0, n.flash))
      })

      // label for hovered device
      if (hovered >= 0) {
        const n = nodes[hovered]
        const { x, y } = P[hovered]
        ctx.font = '600 12px Manrope, sans-serif'
        const tw = ctx.measureText(n.label).width + 20
        const ty = y + (tileSize(n) * 1.14) / 2 + 8
        ctx.fillStyle = '#1A1A1A'
        ctx.beginPath()
        ctx.roundRect(x - tw / 2, ty, tw, 24, 8)
        ctx.fill()
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(n.label, x, ty + 12)
      }
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

    const loop = (t) => { draw(t); frame++; raf = requestAnimationFrame(loop) }

    layout()
    if (reduce) draw(0)
    else {
      raf = requestAnimationFrame(loop)
      parent.addEventListener('pointermove', onMove)
      parent.addEventListener('pointerleave', onLeave)
      parent.addEventListener('pointerdown', onDown)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
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
      className="absolute inset-0 opacity-40 md:opacity-100"
      aria-hidden="true"
    />
  )
}