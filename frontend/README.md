# 🧪 Usability Test Dashboard 2.0

> Rediseño UX/UI, integración de inteligencia artificial y planificación ágil SCRUM sobre el aplicativo web **Usability Test Dashboard**.

Proyecto integrador final — evolución del sistema existente para el análisis de pruebas de usabilidad, incorporando un módulo de IA para interpretar hallazgos y un módulo de planificación ágil SCRUM.

---

## 📋 Módulos del sistema

| # | Módulo | Descripción |
|---|--------|-------------|
| 1️⃣ | **Evaluaciones de usabilidad** | Registro de pruebas, tareas, observaciones, tiempo, errores y satisfacción |
| 2️⃣ | **Dashboard de resultados** | Visualización de métricas, hallazgos frecuentes, severidad y tendencias |
| 3️⃣ | **IA para análisis UX** | Resumen automático de observaciones, clasificación de problemas y sugerencias |
| 4️⃣ | **Rediseño y evidencia de mejora** | Pantalla actual, problema detectado, propuesta visual y justificación |
| 5️⃣ | **Planificación ágil SCRUM** | Backlog, historias, sprints, tablero de tareas, review y retrospectiva |

---

## 🏗️ Arquitectura técnica

| Capa | Tecnología | Responsabilidad |
|------|------------|------------------|
| 🎨 Frontend | React | Componentes atómicos y estado asíncrono |
| ⚙️ Backend | NestJS | `AiModule` con controlador y servicio |
| 🧠 Ingeniería de prompt | — | System prompt restrictivo, salida en JSON estricto |
| 📤 Exportación | Pipeline propio | JSON → Markdown → PDF |

---

## 📁 Estructura del proyecto

```
usability-test-dashboard-2/
├── 📄 README.md
├── 📄 .gitignore
├── 📄 .env.example
├
│
├── 🎨 frontend/                    # React
│   ├── package.json
│   ├── vite.config.ts
│   ├── public/
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── components/             # componentes atómicos
│       │   ├── atoms/
│       │   ├── molecules/
│       │   └── organisms/
│       ├── pages/
│       │   ├── evaluaciones/       # 1️⃣ Evaluaciones
│       │   ├── dashboard/          # 2️⃣ Dashboard
│       │   ├── ia-analisis/        # 3️⃣ IA
│       │   ├── rediseno/           # 4️⃣ Rediseño
│       │   └── scrum/              # 5️⃣ SCRUM
│       │       ├── Backlog.tsx
│       │       ├── SprintBoard.tsx
│       │       ├── SprintReview.tsx
│       │       └── Retrospectiva.tsx
│       ├── hooks/                  # estado asíncrono
│       ├── services/               # llamadas API al backend
│       │   ├── api.ts
│       │   ├── evaluaciones.service.ts
│       │   ├── ia.service.ts
│       │   └── scrum.service.ts
│       ├── types/                  # interfaces TS compartidas
│       └── styles/
│
└── ⚙️ backend/                     # NestJS
    ├── package.json
    ├── nest-cli.json
    ├── tsconfig.json
    └── src/
        ├── main.ts
        ├── app.module.ts
        │
        ├── evaluaciones/           # 1️⃣ Evaluaciones
        │   ├── evaluaciones.module.ts
        │   ├── evaluaciones.controller.ts
        │   ├── evaluaciones.service.ts
        │   ├── entities/
        │   └── dto/
        │
        ├── dashboard/               # 2️⃣ Dashboard
        │   ├── dashboard.module.ts
        │   ├── dashboard.controller.ts
        │   └── dashboard.service.ts
        │
        ├── ai/                      # 3️⃣ IA — AiModule
        │   ├── ai.module.ts
        │   ├── ai.controller.ts
        │   ├── ai.service.ts
        │   ├── prompts/
        │   │   ├── system-prompt.ts
        │   │   └── schemas/
        │   └── dto/
        │       ├── analyze-request.dto.ts
        │       └── analyze-response.dto.ts
        │
        ├── rediseno/                # 4️⃣ Rediseño
        │   ├── rediseno.module.ts
        │   ├── rediseno.controller.ts
        │   └── rediseno.service.ts
        │
        ├── scrum/                   # 5️⃣ SCRUM
        │   ├── scrum.module.ts
        │   ├── backlog/
        │   ├── sprints/
        │   ├── tasks/
        │   └── retrospectiva/
        │
        ├── export/                  # 📤 Pipeline JSON → Markdown → PDF
        │   ├── export.module.ts
        │   ├── export.controller.ts
        │   ├── export.service.ts
        │   ├── json-to-markdown.ts
        │   └── markdown-to-pdf.ts
        │
        ├── common/                  # guards, interceptors, filtros
        └── config/                  # configuración de DB y entorno
```

---

## ✅ Requisitos previos

- 🟢 Node.js 18+
- 📦 npm o yarn
- 🗄️ Base de datos (especificar motor y versión)
- 🔑 Clave de API del proveedor de IA (ver `.env.example`)

---

## 🚀 Instalación

Clonar el repositorio:

```bash
git clone <url-del-repo>
cd nombrerepo
```

### ⚙️ Backend

```bash
cd backend
npm install
cp .env.example .env   # completar variables de entorno
npm run start:dev
```

### 🎨 Frontend

```bash
cd frontend
npm install
cp .env.example .env   # completar variables de entorno
npm run dev
```

---

## 🔐 Variables de entorno

Ver `.env.example` en cada carpeta (`backend/` y `frontend/`). Como mínimo se requiere:

- `DATABASE_URL`
- `AI_API_KEY`
- `PORT` (backend)
- `VITE_API_URL` (frontend, si aplica)

---

## 📜 Scripts principales

| Comando | Ubicación | Descripción |
|---------|-----------|-------------|
| `npm run start:dev` | backend | Levanta el servidor NestJS en modo desarrollo |
| `npm run dev` | frontend | Levanta el servidor de desarrollo de React |
| `npm run build` | ambos | Compila para producción |
| `npm run test` | backend | Corre pruebas unitarias |

---

## 🌿 Convención de ramas

- `main` → versiones entregables 🚢
- `develop` → integración continua del equipo 🔄
- `feature/<modulo>-<nombre>` → trabajo individual por módulo (ej. `feature/scrum-sprint-board`)

---

## 👥 Equipo



---

## 📄 Licencia

Proyecto académico — Universidad Técnica de Ambato (UTA) 🎓