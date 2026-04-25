import { BookOpen, CheckSquare, Code2, Copy, ExternalLink, FileText, PlaySquare, Wrench } from 'lucide-react'
import { useState } from 'react'

const typeStyles = {
  checklist: {
    accent: 'from-gold to-[#e9c45f]',
    badge: 'bg-amberSoft text-ink border-gold/30',
  },
  manual: {
    accent: 'from-[#705d38] to-gold',
    badge: 'bg-[#f5ead0] text-ink border-[#705d38]/20',
  },
  guide: {
    accent: 'from-coal to-gold',
    badge: 'bg-paper text-coal border-line',
  },
  video: {
    accent: 'from-ink to-gold',
    badge: 'bg-ink text-white border-ink',
  },
  code: {
    accent: 'from-gold to-ink',
    badge: 'bg-[#211f1a] text-amberSoft border-gold/30',
  },
  tool: {
    accent: 'from-gold to-[#d8b75d]',
    badge: 'bg-white text-coal border-line',
  },
}

const logoSizeClasses = {
  normal: 'max-h-11 max-w-12',
  large: 'max-h-[3.25rem] max-w-[3.5rem]',
  wide: 'max-h-12 max-w-[3.75rem]',
}

const getKind = (resource) => {
  const value = `${resource.type} ${resource.name}`.toLowerCase()

  if (resource.commands) return 'code'
  if (value.includes('checklist')) return 'checklist'
  if (value.includes('manual')) return 'manual'
  if (value.includes('guía') || value.includes('guia')) return 'guide'
  if (value.includes('curso') || value.includes('tutorial') || value.includes('playlist')) return 'video'
  return 'tool'
}

const getIcon = (resource) => {
  const value = `${resource.type} ${resource.name}`.toLowerCase()

  if (resource.commands) return Code2
  if (value.includes('checklist')) return CheckSquare
  if (value.includes('manual')) return BookOpen
  if (value.includes('guía') || value.includes('guia')) return FileText
  if (value.includes('curso') || value.includes('tutorial') || value.includes('playlist')) return PlaySquare
  return Wrench
}

function ResourceCard({ resource }) {
  const [copied, setCopied] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const Icon = getIcon(resource)
  const style = typeStyles[getKind(resource)]
  const showLogo = resource.logo && !logoFailed
  const logoClassName = logoSizeClasses[resource.logoSize ?? 'normal'] ?? logoSizeClasses.normal

  const copyCommands = async () => {
    if (!resource.commands) return
    await navigator.clipboard.writeText(resource.commands.join('\n'))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <article className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-lg border border-line bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-gold/65 hover:shadow-soft">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${style.accent}`} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-[#fff4d6] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-gold/20">
          {showLogo ? (
            <img
              className={`${logoClassName} object-contain`}
              src={resource.logo}
              alt={resource.logoAlt ?? `${resource.name} logo`}
              loading="lazy"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <Icon size={29} strokeWidth={1.8} aria-hidden="true" />
          )}
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${style.badge}`}>
          {resource.type}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-black leading-snug text-ink">{resource.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-coal/75">{resource.description}</p>

      {resource.commands ? (
        <div className="mt-4 rounded-lg border border-gold/20 bg-ink p-3 font-mono text-xs leading-5 text-amberSoft shadow-inner">
          {resource.commands.map((command) => (
            <div key={command}>{command}</div>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {resource.link ? (
          <a
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coal focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir recurso
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        ) : null}
        {resource.commands ? (
          <button
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 text-sm font-bold text-ink transition hover:border-gold/70 hover:bg-amberSoft focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            onClick={copyCommands}
            type="button"
          >
            <Copy size={16} aria-hidden="true" />
            {copied ? 'Copiado' : 'Copiar comandos'}
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default ResourceCard
