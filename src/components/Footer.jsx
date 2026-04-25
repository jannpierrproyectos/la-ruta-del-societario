function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-lg font-black">La Ruta del Societario</p>
          <p className="mt-1 text-sm text-white/68">SCSF | Comité Permanente Académico</p>
        </div>
        <div className="flex items-center gap-4">
          <img className="h-10 w-auto rounded bg-white object-contain p-1" src="/assets/logo-scsf.png" alt="Logo SCSF" />
          <img className="h-10 w-auto rounded bg-white object-contain p-1" src="/assets/logo-cpa.png" alt="Logo CPA" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
