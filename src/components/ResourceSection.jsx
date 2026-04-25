import { BookOpenCheck, Wrench } from 'lucide-react'
import ResourceCard from './ResourceCard.jsx'

const categoryOrder = ['Herramientas', 'Tutoriales']
const stationMicrocopy = {
  'estacion-01': 'Empieza aquí',
  'estacion-02': 'Aprende a reportar',
  'estacion-03': 'Explora producción científica',
  'estacion-04': 'Diseña y reporta',
  'estacion-05': 'Sintetiza evidencia',
}
const categoryStyles = {
  Herramientas: {
    icon: Wrench,
    label: 'border-gold/30 bg-amberSoft text-ink',
  },
  Tutoriales: {
    icon: BookOpenCheck,
    label: 'border-ink/10 bg-ink text-white',
  },
}

function ResourceSection({ station }) {
  const groupedResources = categoryOrder
    .map((category) => ({
      category,
      resources: station.resources.filter((resource) => resource.category === category),
    }))
    .filter((group) => group.resources.length > 0)

  return (
    <section id={station.id} className="scroll-mt-28 pl-14 lg:pl-20">
      <div className="relative">
        <div className="absolute -left-14 top-1 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#f6efe2] bg-ink text-sm font-black text-gold shadow-soft ring-2 ring-gold/55 lg:-left-20 lg:h-16 lg:w-16 lg:text-base">
          {station.number}
        </div>

        <div className="overflow-hidden rounded-lg border border-gold/20 bg-[#fffdf7] shadow-soft">
          <div className="relative border-b border-line bg-gradient-to-br from-white via-[#fbf7ee] to-amberSoft/55 p-5 sm:p-6 lg:p-7">
            <div className="absolute right-5 top-4 text-7xl font-black leading-none text-gold/10 sm:text-8xl" aria-hidden="true">
              {station.number}
            </div>
            <div className="relative grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <p className="inline-flex rounded-full border border-gold/30 bg-white/80 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-gold">
                  Estación {station.number}
                </p>
                <h2 className="mt-3 text-2xl font-black text-ink sm:text-3xl">{station.title}</h2>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-coal/55">
                  {stationMicrocopy[station.id]}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-coal/75 sm:text-base">{station.description}</p>
              </div>
              <div className="rounded-full border border-gold/25 bg-white px-4 py-3 text-sm font-black text-coal shadow-soft">
                {station.resources.length} {station.resources.length === 1 ? 'recurso' : 'recursos'}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 lg:p-7">
            {groupedResources.length > 0 ? (
              <div className="space-y-7">
                {groupedResources.map((group) => {
                  const CategoryIcon = categoryStyles[group.category].icon

                  return (
                    <div key={group.category}>
                      <div className="mb-4 flex items-center gap-3">
                        <h3
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] ${categoryStyles[group.category].label}`}
                        >
                          <CategoryIcon size={14} aria-hidden="true" />
                          {group.category}
                        </h3>
                        <span className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {group.resources.map((resource) => (
                          <ResourceCard key={resource.id} resource={resource} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-line bg-paper p-5 text-sm font-medium text-coal/70">
                Esta estación no tiene recursos visibles con los filtros actuales.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourceSection
