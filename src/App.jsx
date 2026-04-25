import { useMemo, useState } from 'react'
import { Compass } from 'lucide-react'
import Hero from './components/Hero.jsx'
import RouteNav from './components/RouteNav.jsx'
import SearchFilters from './components/SearchFilters.jsx'
import ResourceSection from './components/ResourceSection.jsx'
import Footer from './components/Footer.jsx'
import { filterOptions, stations } from './data/resources.js'

const normalize = (value) =>
  value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

function App() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todos')

  const totalResources = useMemo(
    () => stations.reduce((sum, station) => sum + station.resources.length, 0),
    [],
  )

  const filteredStations = useMemo(() => {
    const normalizedQuery = normalize(query.trim())

    return stations.map((station) => {
      const resources = station.resources.filter((resource) => {
        const matchesFilter =
          activeFilter === 'Todos' ||
          resource.filterTags.includes(activeFilter) ||
          resource.category === activeFilter ||
          resource.type === activeFilter

        const searchable = normalize(
          [
            station.title,
            station.description,
            resource.name,
            resource.type,
            resource.category,
            resource.description,
            ...(resource.commands ?? []),
          ].join(' '),
        )

        return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery))
      })

      return { ...station, resources }
    })
  }, [activeFilter, query])

  const visibleResources = filteredStations.reduce((sum, station) => sum + station.resources.length, 0)

  return (
    <div className="min-h-screen text-ink">
      <Hero totalResources={totalResources} />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <RouteNav stations={stations} />
        <SearchFilters
          activeFilter={activeFilter}
          filters={filterOptions}
          query={query}
          setActiveFilter={setActiveFilter}
          setQuery={setQuery}
          totalResources={totalResources}
          visibleResources={visibleResources}
        />

        {visibleResources > 0 ? (
          <div className="route-line mt-10 space-y-10 lg:mt-14 lg:space-y-16">
            {filteredStations.map((station) => (
              <ResourceSection key={station.id} station={station} />
            ))}
          </div>
        ) : (
          <section className="mt-10 rounded-lg border border-dashed border-gold/35 bg-white/78 px-6 py-14 text-center shadow-soft">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amberSoft text-gold">
              <Compass size={22} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-ink">No hay recursos para esta búsqueda</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-coal/75">
              Ajusta el término de búsqueda o cambia el filtro para retomar la ruta.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
