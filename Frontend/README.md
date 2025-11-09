# MAIT IA Onboarding Frontend (Base Scaffold)

Este proyecto inicializa el frontend en React + Vite para el asistente cognitivo descrito en la documentación del *Hito 1*. El objetivo es contar con una estructura modular lista para desarrollar progresivamente las historias de usuario sin implementar aún la lógica de negocio.

## Stack

- **React 18 + TypeScript**
- **Vite** para bundling y desarrollo rápido
- **TailwindCSS** para estilos utilitarios
- **React Router** para flujo multipágina
- **TanStack Query** y **Zustand** preparados para orquestar datos y estado

## Estructura principal

```
Frontend/
 ├─ public/                # Estáticos (favicon, manifest, etc.)
 ├─ src/
 │   ├─ modules/
 │   │   ├─ sessions/      # Placeholders para workspace de sesión
 │   │   ├─ interactions/  # Placeholders para timeline de sugerencias
 │   │   └─ audits/        # Placeholders para registro JSON auditable
 │   ├─ routes/            # Definición centralizada de rutas
 │   └─ shared/            # Componentes, hooks y estilos reutilizables
 ├─ env.template           # Variables a copiar en `.env`
 ├─ package.json
 └─ vite.config.ts
```

## Scripts útiles

```bash
cd Frontend
npm install
cp env.template .env # ajustar variables según entorno
npm run dev          # servidor de desarrollo en http://localhost:5173
npm run build        # compila para producción (dist/)
npm run lint         # valida reglas de ESLint
```

## Próximos pasos sugeridos

- Conectar el enrutador a datos reales del backend (`VITE_API_BASE_URL`).
- Sustituir los placeholders por componentes reales de sesión, interacción y auditoría.
- Añadir manejo de autenticación, niveles de acceso y telemetría.
- Crear pruebas unitarias y de componentes a medida que las historias evolucionen.

Este armazón sigue las prácticas descritas en el documento base (guía progresiva, JSON estructurado, trazabilidad KYC) y está listo para iterar con las historias de usuario del MVP.

