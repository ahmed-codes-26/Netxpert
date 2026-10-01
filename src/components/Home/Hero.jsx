import NetworkBackground from './NetworkBackground'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white">
      <NetworkBackground />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-24">
        <p className="text-sm font-semibold tracking-widest text-red">
          TELECOM & DATA CENTER INFRASTRUCTURE
        </p>
        <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight md:text-6xl">
          Future-ready infrastructure, built end to end.
        </h1>
        <p className="mt-5 max-w-lg text-lg text-muted">
          From site survey and design to data center and fiber deployment, we
          deliver the infrastructure your network depends on.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-xl bg-red px-6 py-3 font-semibold text-white hover:bg-red-dark">
            Explore Services
          </button>
          <button className="rounded-xl border border-ink px-6 py-3 font-semibold text-ink">
            View Projects
          </button>
        </div>
      </div>
    </section>
  )
}