import { useEffect, useState } from 'react'
import { ArrowDown, BookMarked, CircleDot, Route } from 'lucide-react'

const heroStations = [
  ['estacion-01', '01', 'Principios básicos'],
  ['estacion-02', '02', 'Reportes y series'],
  ['estacion-03', '03', 'Bibliometría'],
  ['estacion-04', '04', 'Observacionales'],
  ['estacion-05', '05', 'Revisiones'],
]

function Hero({ totalResources }) {
  const [activeId, setActiveId] = useState(heroStations[0][0])

  useEffect(() => {
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

    heroStations.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="relative overflow-hidden border-b border-gold/20 bg-[#f6efe2]">
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full border border-gold/20" aria-hidden="true" />
      <div
        className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(120deg,transparent,rgba(199,154,43,0.10))]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-7 sm:px-6 md:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-12">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-md border border-line bg-white/80 p-1.5 shadow-soft">
              <img className="h-10 w-auto object-contain sm:h-12" src="/assets/logo-scsf.png" alt="Logo SCSF" />
            </div>
            <div className="rounded-md border border-line bg-white/80 p-1.5 shadow-soft">
              <img className="h-10 w-auto object-contain sm:h-12" src="/assets/logo-cpa.png" alt="Logo CPA" />
            </div>
          </div>

          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/65 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-gold">
            <CircleDot size={13} aria-hidden="true" />
            SCSF | Comité Permanente Académico
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.98] text-ink sm:text-5xl lg:text-7xl">
            La Ruta del Societario
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-7 text-coal sm:text-xl">
            Recursos académicos para investigación científica en salud
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-coal/72 sm:text-base">
            Un recorrido progresivo para aprender, producir y publicar investigación científica.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#ruta"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-coal focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              Recorrer estaciones
              <ArrowDown size={17} aria-hidden="true" />
            </a>
            <span className="rounded-full border border-gold/25 bg-white/80 px-4 py-3 text-sm font-bold text-coal shadow-soft">
              {totalResources} recursos curados
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center lg:justify-end">
          <div className="relative w-full max-w-xl overflow-hidden rounded-lg border border-gold/25 bg-ink p-5 text-white shadow-soft sm:p-6">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-gold/30" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-gold/10 to-transparent" aria-hidden="true" />

            <div className="relative flex items-center justify-between gap-4 border-b border-white/12 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                  <Route size={24} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-base font-black">Mapa de aprendizaje</p>
                  <p className="text-sm text-white/62">5 estaciones formativas</p>
                </div>
              </div>
              <div className="hidden rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/75 sm:block">
                CPA
              </div>
            </div>

            <div className="relative mt-6">
              <div className="absolute left-6 top-6 hidden h-0.5 w-[calc(100%-3rem)] bg-gradient-to-r from-gold via-white/20 to-gold/70 md:block" />
              <div className="grid gap-3 md:grid-cols-5">
                {heroStations.map(([id, number, label], index) => {
                  const isActive = activeId === id

                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative rounded-md border p-3 text-left backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-gold/70 hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ink ${
                        isActive ? 'border-gold/70 bg-white/[0.12] shadow-soft' : 'border-white/10 bg-white/[0.06]'
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black transition ${
                          isActive
                            ? 'border-gold bg-gold text-ink'
                            : 'border-gold/60 bg-ink text-gold'
                        }`}
                      >
                        {number}
                      </span>
                      <p className="mt-3 text-sm font-bold leading-tight text-white">{label}</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                        Tramo {index + 1}
                      </p>
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] p-4">
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
