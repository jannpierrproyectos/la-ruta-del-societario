import { useEffect, useState } from 'react'

function RouteNav({ stations }) {
  const [activeId, setActiveId] = useState(stations[0]?.id)

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

    stations.forEach((station) => {
      const element = document.getElementById(station.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [stations])

  return (
    <nav
      id="ruta"
      className="sticky top-0 z-20 -mx-4 border-b border-gold/15 bg-[#f6efe2]/92 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto rounded-full border border-line bg-white/65 p-1 shadow-soft">
        {stations.map((station) => {
          const isActive = activeId === station.id

          return (
            <a
              key={station.id}
              href={`#${station.id}`}
              className={`group inline-flex min-w-max items-center gap-2 rounded-full px-3 py-2 text-sm font-black transition ${
                isActive ? 'bg-ink text-white shadow-soft' : 'text-coal/75 hover:bg-amberSoft hover:text-ink'
              }`}
            >
              <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-gold text-ink' : 'bg-paper text-gold'}`}>
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
