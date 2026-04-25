import { Search } from 'lucide-react'

function SearchFilters({
  activeFilter,
  filters,
  query,
  setActiveFilter,
  setQuery,
  totalResources,
  visibleResources,
}) {
  return (
    <section className="mt-8 rounded-lg border border-gold/20 bg-white/72 p-3 shadow-soft backdrop-blur sm:p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="relative block">
          <span className="sr-only">Buscar recursos</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coal/45" size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por recurso, tipo, estación o descripción"
            className="h-11 w-full rounded-full border border-line bg-[#fbf7ee] pl-11 pr-4 text-sm font-semibold text-ink outline-none transition placeholder:text-coal/42 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20"
            type="search"
          />
        </label>
        <div className="rounded-full border border-line bg-paper px-3 py-2 text-sm font-bold text-coal/70">
          <span className="text-ink">{visibleResources}</span> de {totalResources} recursos
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => {
          const isActive = filter === activeFilter
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`min-w-max rounded-full border px-3 py-2 text-sm font-bold transition ${
                isActive
                  ? 'border-ink bg-ink text-white shadow-soft'
                  : 'border-line bg-[#fbf7ee] text-coal hover:border-gold/70 hover:bg-amberSoft hover:text-ink'
              }`}
              type="button"
            >
              {filter}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default SearchFilters
