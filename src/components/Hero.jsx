import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, BookMarked, CircleDot, Route } from 'lucide-react'

const heroStations = [
  ['estacion-01', '01', 'Principios básicos'],
  ['estacion-02', '02', 'Reportes y series'],
  ['estacion-03', '03', 'Bibliometría'],
  ['estacion-04', '04', 'Observacionales'],
  ['estacion-05', '05', 'Revisiones'],
]

function Hero({ totalResources, visibleStationIds = heroStations.map(([id]) => id) }) {
  const displayedHeroStations = useMemo(() => {
    if (!visibleStationIds.length) return heroStations
    return heroStations.filter(([id]) => visibleStationIds.includes(id))
  }, [visibleStationIds])

  const [activeId, setActiveId] = useState(displayedHeroStations[0]?.[0] ?? heroStations[0][0])

  useEffect(() => {
    setActiveId(displayedHeroStations[0]?.[0] ?? heroStations[0][0])

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    displayedHeroStations.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [displayedHeroStations])

  return (
    <header className="relative overflow-hidden border-b border-gold/20 bg-[#f6efe2]">
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full border border-gold/20" aria-hidden="true" />
      <div
        className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(120deg,transparent,rgba(199,154,43,0.10))]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-5 px-3 py-4 sm:gap-8 sm:px-6 sm:py-8 md:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-12">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="rounded-md border border-line bg-white/80 p-1 shadow-soft sm:p-1.5">
              <img className="h-8 w-auto object-contain sm:h-12" src="/assets/logo-scsf.png" alt="Logo SCSF" />
            </div>
            <div className="rounded-md border border-line bg-white/80 p-1 shadow-soft sm:p-1.5">
              <img className="h-8 w-auto object-contain sm:h-12" src="/assets/logo-cpa.png" alt="Logo CPA" />
            </div>
          </div>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/65 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.13em] text-gold sm:mt-7 sm:text-xs sm:tracking-[0.16em]">
            <CircleDot size={13} aria-hidden="true" />
            SCSF | Comité Permanente Académico
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-[1.02] text-ink sm:mt-4 sm:text-5xl lg:text-7xl">
            La Ruta del Societario
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-6 text-coal sm:mt-5 sm:text-xl sm:leading-7">
            Recursos académicos para investigación científica en salud
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-coal/72 sm:mt-3 sm:text-base sm:leading-6">
            Un recorrido progresivo para aprender, producir y publicar investigación científica.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
            <a
              href="#ruta"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-coal focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 sm:px-5 sm:py-3"
            >
              Recorrer estaciones
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <span className="rounded-full border border-gold/25 bg-white/80 px-3 py-2.5 text-sm font-bold text-coal shadow-soft sm:px-4 sm:py-3">
              {totalResources} recursos curados
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center lg:justify-end">
          <div className="relative w-full max-w-xl overflow-visible rounded-lg border border-gold/25 bg-ink p-3 text-white shadow-soft sm:overflow-hidden sm:p-6">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-gold/30" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-gold/10 to-transparent" aria-hidden="true" />

            <div className="relative flex items-center justify-between gap-3 border-b border-white/12 pb-3 sm:gap-4 sm:pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink sm:h-12 sm:w-12">
                  <Route size={21} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black sm:text-base">Mapa de aprendizaje</p>
                  <p className="text-xs text-white/62 sm:text-sm">5 estaciones formativas</p>
                </div>
              </div>
              <div className="hidden rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/75 sm:block">
                CPA
              </div>
            </div>

            <div className="relative mt-3 min-w-0 sm:mt-6">
              <div className="absolute left-6 top-6 hidden h-0.5 w-[calc(100%-3rem)] bg-gradient-to-r from-gold via-white/20 to-gold/70 md:block" />
              <div className="-mx-1 overflow-x-auto overscroll-x-contain scroll-smooth px-1 pb-2 pr-8 [scroll-padding-inline:0.25rem] md:mx-0 md:overflow-visible md:px-0 md:pb-0 md:pr-0">
                <div className="flex w-max min-w-max snap-x snap-mandatory gap-2 pr-8 md:grid md:w-auto md:min-w-0 md:grid-cols-5 md:gap-3 md:pr-0">
                  {displayedHeroStations.map(([id, number, label], index) => {
                    const isActive = activeId === id

                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={`relative w-36 shrink-0 snap-start rounded-md border p-2.5 text-left backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-gold/70 hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ink sm:w-40 sm:p-3 md:w-auto md:shrink ${
                          isActive ? 'border-gold/70 bg-white/[0.12] shadow-soft' : 'border-white/10 bg-white/[0.06]'
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black transition sm:h-11 sm:w-11 sm:text-sm ${
                            isActive
                              ? 'border-gold bg-gold text-ink'
                              : 'border-gold/60 bg-ink text-gold'
                          }`}
                        >
                          {number}
                        </span>
                        <p className="mt-2 text-xs font-bold leading-tight text-white sm:mt-3 sm:text-sm">{label}</p>
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45 sm:text-[11px] sm:tracking-[0.12em]">
                          Tramo {index + 1}
                        </p>
                      </a>
                    )
                  })}
                  <span className="block w-10 shrink-0 md:hidden" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="relative mt-3 hidden items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] p-4 sm:flex">
              <BookMarked className="text-gold" size={21} aria-hidden="true" />
              <p className="text-sm leading-6 text-white/72">
                De los fundamentos a la síntesis de evidencia, con recursos listos para consultar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
