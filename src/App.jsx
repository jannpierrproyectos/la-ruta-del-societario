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

  const hasActiveFilter = activeFilter !== 'Todos' || query.trim() !== ''

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
  const renderedStations = hasActiveFilter
    ? filteredStations.filter((station) => station.resources.length > 0)
    : filteredStations
  const visibleStationIds = renderedStations.map((station) => station.id)

  return (
    <div className="min-h-screen overflow-x-hidden text-ink">
      <Hero totalResources={totalResources} visibleStationIds={visibleStationIds} />
      <main className="mx-auto w-full max-w-7xl px-3 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <RouteNav stations={renderedStations} />
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
          <div className="route-line mt-7 space-y-7 sm:mt-10 sm:space-y-10 lg:mt-14 lg:space-y-16">
            {renderedStations.map((station) => (
              <ResourceSection key={station.id} station={station} />
            ))}
          </div>
        ) : (
          <section className="mt-8 rounded-lg border border-dashed border-gold/35 bg-white/78 px-5 py-10 text-center shadow-soft sm:mt-10 sm:px-6 sm:py-14">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-amberSoft text-gold sm:h-12 sm:w-12">
              <Compass size={22} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-ink sm:text-2xl">
              No se encontraron recursos con los filtros actuales.
            </h2>
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
