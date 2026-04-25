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
    <section className="mt-5 rounded-lg border border-gold/20 bg-white/72 p-2.5 shadow-soft backdrop-blur sm:mt-8 sm:p-4">
      <div className="grid gap-2.5 sm:gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="relative block">
          <span className="sr-only">Buscar recursos</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-coal/45 sm:left-4" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar recursos"
            className="h-10 w-full rounded-full border border-line bg-[#fbf7ee] pl-10 pr-4 text-sm font-semibold text-ink outline-none transition placeholder:text-coal/42 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20 sm:h-11 sm:pl-11"
            type="search"
          />
        </label>
        <div className="w-max rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-bold text-coal/70 sm:py-2 sm:text-sm">
          <span className="text-ink">{visibleResources}</span> de {totalResources} recursos
        </div>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 sm:mt-4 sm:gap-2">
        {filters.map((filter) => {
          const isActive = filter === activeFilter
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`min-w-max rounded-full border px-2.5 py-1.5 text-xs font-bold transition sm:px-3 sm:py-2 sm:text-sm ${
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
