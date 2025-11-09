export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 pb-4">
      <div>
        <h1 className="text-2xl font-semibold text-primary-foreground">
          MAIT IA Onboarding Assistant
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Base UI lista para incorporar historias de usuario sobre sesiones,
          sugerencias cognitivas y trazabilidad regulatoria.
        </p>
      </div>
      <div className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
        Estado: <span className="font-semibold text-primary-foreground">MVP scaffold</span>
      </div>
    </header>
  );
}

