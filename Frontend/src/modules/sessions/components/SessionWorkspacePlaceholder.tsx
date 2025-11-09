export function SessionWorkspacePlaceholder() {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-white">
          Workspace de sesiones
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Aquí se conectará la orquestación de sesiones de onboarding,
          incluyendo estado de avance, notas del asesor y sugerencias generadas
          por IA (según las historias de usuario). Actualmente es solo un
          contenedor base.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-white/30 p-6 text-center text-white/60">
        Agrega componentes de detalle de sesión, formularios validados con Zod y
        conectores a la API conforme avances en el MVP.
      </div>
    </div>
  );
}

