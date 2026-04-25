import { useEffect, useState } from 'react'

function RouteNav({ stations }) {
  const [activeId, setActiveId] = useState(stations[0]?.id)

  useEffect(() => {
    setActiveId(stations[0]?.id)

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

    stations.forEach((station) => {
      const element = document.getElementById(station.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [stations])

  return (
    <nav
      id="ruta"
      className="sticky top-0 z-20 -mx-3 border-b border-gold/15 bg-[#f6efe2]/92 px-3 py-2 backdrop-blur sm:-mx-6 sm:px-6 sm:py-3 lg:-mx-8 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto rounded-full border border-line bg-white/65 p-1 shadow-soft sm:gap-2">
        {stations.map((station) => {
          const isActive = activeId === station.id

          return (
            <a
              key={station.id}
              href={`#${station.id}`}
              className={`group inline-flex min-w-max items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-black transition sm:gap-2 sm:px-3 sm:py-2 sm:text-sm ${
                isActive ? 'bg-ink text-white shadow-soft' : 'text-coal/75 hover:bg-amberSoft hover:text-ink'
              }`}
            >
              <span className={`rounded-full px-1.5 py-0.5 text-[11px] sm:px-2 sm:text-xs ${isActive ? 'bg-gold text-ink' : 'bg-paper text-gold'}`}>
                {station.number}
              </span>
              <span>{station.title}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default RouteNav
