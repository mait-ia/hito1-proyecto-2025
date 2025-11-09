export function InteractionTimelinePlaceholder() {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-white">
          Timeline de interacciones
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Diseñado para listar sugerencias, flags de contradicción y progreso
          JSON por intención (sugerencia, confirmación, recordatorio,
          cierreParcial) como establece el documento del proyecto.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-white/30 p-6 text-center text-white/60">
        Implementa componentes como InteractionCard o filtros por categoría
        cuando las historias de usuario lo requieran.
      </div>
    </div>
  );
}

