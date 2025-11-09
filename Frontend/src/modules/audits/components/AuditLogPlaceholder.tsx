export function AuditLogPlaceholder() {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-white">
          Registro de auditoría
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Este módulo visualizará sellos de tiempo, actores y payloads JSON
          auditables, cumpliendo la trazabilidad exigida por KYC/SARLAFT.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-white/30 p-6 text-center text-white/60">
        Conecta este contenedor a la API de auditoría para renderizar tablas,
        filtros por sesión y exportes cuando estén listos.
      </div>
    </div>
  );
}

