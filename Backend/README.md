# MAIT IA Onboarding Backend (Base)

Base code structure for the MAIT IA dynamic onboarding assistant. This repository provides the architectural scaffolding so new user stories can be implemented iteratively.

## Overview

- **Runtime:** Node.js 20+, TypeScript
- **API Style:** REST over Express with modular feature folders
- **Architecture:** Modular hexagonal-inspired layout (config, shared, modules, routes)
- **Persistence:** In-memory repositories ready to be replaced with adapters (MongoDB, PostgreSQL, etc.)
- **Logging & Validation:** Pino, Zod

This base does not contain business logic; controllers return placeholder responses while repositories keep data in memory for quick experimentation.

## Project Structure

```
Backend/
 ├─ src/
 │   ├─ config/        # Environment, logger
 │   ├─ routes/        # API route registration
 │   ├─ modules/       # Domain modules (sessions, interactions, audits)
 │   │   └─ ...        # Controllers, services, repositories, DTOs
 │   └─ shared/        # Cross-cutting utilities and middleware
 ├─ env.template       # Copy to .env and set real secrets
 ├─ package.json
 ├─ tsconfig.json
 └─ README.md
```

## Getting Started

```bash
cd Backend
cp env.template .env            # Update secrets before running
npm install
npm run dev
```

The development server listens on `PORT` (default `3000`) and exposes the REST API under `/api/v1`.

## Next Steps

- Replace in-memory repositories with actual data sources (e.g. MongoDB for sessions, Redis for interaction cache, storage bucket for audit trails).
- Wire integration with speech-to-text providers and GenAI orchestration services.
- Implement authentication/authorization guardrails (advisor SSO, supervisor scopes).
- Add automated tests (unit and contract) once core flows are implemented.

## Available Endpoints (MVP)

- `POST /api/v1/interviews` — crea una entrevista, retorna `interviewId`, `status: "INIT"` y registra el evento `onboarding.interview.created`.
- `POST /api/v1/sessions` — crea una sesión (in-memory placeholder).
- `GET /api/v1/sessions/:sessionId` — obtiene una sesión por ID.
- `PATCH /api/v1/sessions/:sessionId/status` — actualiza el estado de una sesión.
- `POST /api/v1/interactions` — registra interacciones asociadas a una sesión.
- `GET /api/v1/interactions/:sessionId` — lista interacciones de una sesión.
- `POST /api/v1/audits` — crea registros de auditoría manualmente.
- `GET /api/v1/audits/:sessionId` — consulta eventos de auditoría por sesión.

## Documentation References

Consult the project brief (`__docx/document.txt`) for detailed flow definitions, regulatory constraints (KYC/SARLAFT), and prioritised capabilities:

- Real-time script guidance
- Contradiction detection
- Structured session summaries
- Auditable JSON outputs

Use this scaffolding as the base to iteratively deliver those user stories.

