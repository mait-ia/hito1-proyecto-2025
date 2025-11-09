export function DashboardScreen() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-white">
          Resumen del asistente
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Este módulo inicial prepara el terreno para integrar flujos de
          onboarding asistidos por IA generativa tal como se describe en el
          documento entregado. Utiliza tarjetas y placeholders para evolucionar
          hacia paneles de métricas, seguimiento de sesiones y cobertura
          regulatoria.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-medium text-white/80">Sesiones activas</h3>
          <p className="mt-2 text-3xl font-semibold text-primary-foreground">
            --
          </p>
          <p className="mt-1 text-xs text-white/60">
            Conecta este bloque a la API de sesiones cuando se implementen las
            historias correspondientes.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-medium text-white/80">Cobertura KYC</h3>
          <p className="mt-2 text-3xl font-semibold text-primary-foreground">
            --
          </p>
          <p className="mt-1 text-xs text-white/60">
            Placeholder para visualizaciones de progreso y alertas de
            contradicciones.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-medium text-white/80">
            Flags regulatorios
          </h3>
          <p className="mt-2 text-3xl font-semibold text-primary-foreground">
            --
          </p>
          <p className="mt-1 text-xs text-white/60">
            Diseñado para integrarse con el módulo de auditoría y registro JSON.
          </p>
        </div>
      </section>
    </div>
  );
}

