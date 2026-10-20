# 🧪 Usability Test Dashboard 2.0

> Rediseño UX/UI, integración de inteligencia artificial y planificación ágil SCRUM sobre el aplicativo web **Usability Test Dashboard**.

Proyecto integrador final — evolución del sistema existente para el análisis de pruebas de usabilidad, incorporando un módulo de IA para interpretar hallazgos y un módulo de planificación ágil SCRUM.

**Universidad Técnica de Ambato (UTA)** 🎓 — Proyecto académico.

---

## 📌 Estado del proyecto

Este README describe la visión completa del proyecto integrador (5 módulos académicos). Hoy, lo único **construido y subido al repositorio** es la base del frontend: **Login** y **Dashboard**. Todo lo demás está planificado pero no implementado.

| | |
|---|---|
| ✅ Hecho | Login, layout compartido (Sidebar/Topbar), Dashboard (KPIs, tendencia, proyectos, actividad, sugerencia de IA) |
| 🚧 En construcción / planificado con detalle | Pruebas, Observaciones, Matrices heurísticas, Historias de usuario (ver `HANDOFF_BACKEND.md` y `NOTAS_UX.md` cuando existan) |
| ⛔ Sin especificar todavía | Rediseño y evidencia de mejora, Planificación ágil SCRUM (Backlog, Sprints, Review, Retrospectiva) |
| ⛔ No iniciado | Backend (NestJS), base de datos, integración real de IA (Gemini), pipeline de exportación JSON → Markdown → PDF |

---

## 📋 Módulos del sistema

Los 5 módulos son la organización de alto nivel del proyecto integrador. La columna "Se resuelve con" indica el módulo técnico real que le corresponde en el código.

| # | Módulo académico | Descripción | Se resuelve con (frontend) | Estado |
|---|--------|-------------|---|---|
| 1️⃣ | **Evaluaciones de usabilidad** | Registro de pruebas, tareas, observaciones, tiempo, errores y satisfacción | `features/pruebas` + `features/observaciones` | 🚧 Pendiente |
| 2️⃣ | **Dashboard de resultados** | Visualización de métricas, hallazgos frecuentes, severidad y tendencias | `features/dashboard` | ✅ Construido |
| 3️⃣ | **IA para análisis UX** | Resumen automático de observaciones, clasificación de problemas y sugerencias | Tarjetas de IA embebidas en Dashboard, Observaciones e Historias (no es un módulo aparte en el frontend) | 🚧 Parcial |
| 4️⃣ | **Rediseño y evidencia de mejora** | Pantalla actual, problema detectado, propuesta visual y justificación | Por definir | ⛔ Sin especificar |
| 5️⃣ | **Planificación ágil SCRUM** | Backlog, historias, sprints, tablero de tareas, review y retrospectiva | `features/historias` cubre historias/backlog; Sprint Board, Review y Retrospectiva no tienen módulo técnico aún | ⛔ Sin especificar |

> **Nota:** "Matrices heurísticas" (del plan técnico original) no aparece en la tabla de 5 módulos académicos. Queda pendiente decidir si forma parte de "Evaluaciones" o si se documenta aparte.

---

## 🏗️ Arquitectura técnica

| Capa | Tecnología | Estado |
|------|------------|--------|
| 🎨 Frontend | React 18 + TypeScript + Vite + Tailwind | ✅ En desarrollo activo |
| ⚙️ Backend | NestJS (`AiModule`, `EvaluacionesModule`, etc.) | ⛔ No iniciado — hoy el frontend corre 100% con datos mock |
| 🧠 Ingeniería de prompt | System prompt restrictivo, salida en JSON estricto | ⛔ No iniciado — la IA se simula en el frontend con `setTimeout` y datos fijos |
| 📤 Exportación | Pipeline JSON → Markdown → PDF | ⛔ No iniciado — hoy la exportación es un CSV generado en el cliente |
| 🗄️ Base de datos | Por definir | ⛔ No iniciado |

---

## 📁 Estructura del repositorio

```
usability-test-dashboard-2/
├── README.md                    # este archivo
├── HANDOFF_BACKEND.md           # (pendiente) endpoints esperados por cada servicio del frontend
├── NOTAS_UX.md                  # (pendiente) decisiones de Fitts/Gestalt/Nielsen/POUR por módulo
├── .gitignore
├── .env.example
│
├── frontend/                    # React — ver README propio en frontend/README.md
│   ├── package.json
│   ├── vite.config.ts
│   ├── .env.example
│   └── src/
│       ├── main.tsx
│       ├── App.tsx                 # definición de rutas
│       ├── app/                    # Layout compartido: AppLayout, Sidebar, Topbar
│       ├── components/ui/          # Button, Card, Badge, StatusBadge, FormField,
│       │                             Table, Toast, Skeleton, EstadoError...
│       ├── features/
│       │   ├── auth/                # ✅ Login, AuthContext, ProtectedRoute
│       │   ├── dashboard/           # ✅ Resumen de Actividad
│       │   ├── pruebas/             # 🚧 pendiente (Evaluaciones)
│       │   ├── observaciones/       # 🚧 pendiente (Evaluaciones)
│       │   ├── matrices/            # 🚧 pendiente
│       │   └── historias/           # 🚧 pendiente (SCRUM / Backlog)
│       ├── services/                # 1 función async por operación, hoy con mocks
│       │                              y comentarios // TODO(backend): ...
│       ├── mocks/                   # Datos simulados
│       ├── types/                   # Interfaces TS compartidas (contrato con backend)
│       └── utils/                   # exportarCsv, formatearFecha, useAsync...
│
└── backend/                     # ⛔ No iniciado. Estructura planificada:
    └── src/
        ├── evaluaciones/         # 1️⃣ Evaluaciones
        ├── dashboard/            # 2️⃣ Dashboard
        ├── ai/                   # 3️⃣ IA — AiModule (prompts/, dto/)
        ├── rediseno/             # 4️⃣ Rediseño
        ├── scrum/                # 5️⃣ SCRUM (backlog/, sprints/, tasks/, retrospectiva/)
        ├── export/               # Pipeline JSON → Markdown → PDF
        ├── common/               # guards, interceptors, filtros
        └── config/               # configuración de DB y entorno
```

La estructura interna de `frontend/src/` es la real, ya construida (Context + hooks, sin Redux, sin librerías de UI pesadas). El detalle de instalación y rutas está en **`frontend/README.md`**.

---

## ✅ Requisitos previos

- 🟢 Node.js 18+ (recomendado 20 LTS)
- 📦 npm
- 🗄️ Base de datos — *motor y versión por definir, ver sección Backend*
- 🔑 Clave de API del proveedor de IA — *por definir cuando se conecte Gemini; hoy no aplica*

---

## 🚀 Instalación

### 🎨 Frontend (disponible hoy)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Detalle completo, rutas y credenciales mock en [`frontend/README.md`](./frontend/README.md).

### ⚙️ Backend (aún no existe en el repo)

```bash
# Referencia para cuando se inicie el proyecto NestJS:
cd backend
npm install
cp .env.example .env
npm run start:dev
```

---

## 🔐 Variables de entorno

| Variable | Ubicación | Estado |
|---|---|---|
| `VITE_API_URL` | `frontend/.env` | Definida, sin uso aún (el frontend corre con mocks) |
| `DATABASE_URL` | `backend/.env` | Por definir |
| `AI_API_KEY` | `backend/.env` | Por definir (integración real de IA aún no iniciada) |
| `PORT` | `backend/.env` | Por definir |

---

## 📜 Scripts principales

| Comando | Ubicación | Descripción | Estado |
|---------|-----------|-------------|--------|
| `npm run dev` | `frontend/` | Levanta el servidor de desarrollo de React | ✅ Disponible |
| `npm run build` | `frontend/` | Compila para producción | ✅ Disponible |
| `npm run lint` | `frontend/` | Corre ESLint | ✅ Disponible |
| `npm run start:dev` | `backend/` | Levanta el servidor NestJS en modo desarrollo | ⛔ Backend no iniciado |
| `npm run test` | `backend/` | Corre pruebas unitarias | ⛔ Backend no iniciado |

---

## 🌿 Convención de ramas

- `main` → versiones entregables 🚢
- `develop` → integración continua del equipo 🔄
- `feature/<modulo>-<nombre>` → trabajo individual por módulo (ej. `feature/evaluaciones-listado`, `feature/scrum-sprint-board`)

---

## 👥 Equipo

*(pendiente de completar)*

---

## 📄 Licencia

Proyecto académico — Universidad Técnica de Ambato (UTA) 🎓
