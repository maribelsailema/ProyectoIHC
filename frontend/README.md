# IHC — Frontend

Plataforma de planificación y ejecución de pruebas de usabilidad, con un módulo de IA simulado (a futuro, Google Gemini). Este `README.md` documenta únicamente la carpeta `frontend/`.

> **Estado actual:** el frontend se está construyendo módulo por módulo. Completados: **Login** y **Dashboard**. Los módulos Pruebas, Observaciones, Matrices heurísticas e Historias de usuario están planificados pero aún muestran una pantalla "Próximamente" (ver [Rutas](#rutas)).

---

## Requisitos

- **Node.js 18+** (recomendado 20 LTS) — `node -v`
- **npm** (incluido con Node) — `npm -v`

## Instalación

```bash
cd frontend
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173` (o el puerto que indique la terminal).

### Variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_API_URL` | URL base del backend (NestJS). Hoy no se usa: todo el frontend corre con datos mock. | `http://localhost:3000` |

---

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- `react-router-dom`
- `lucide-react` (íconos)
- Gráficos: SVG propio, sin librerías externas
- Estado: React Context + hooks (sin Redux)
- Sin backend: toda la información viene de `services/`, que hoy devuelven mocks con retardo simulado (300–600 ms)

---

## Estructura de carpetas

```
frontend/
├─ src/
│  ├─ app/                # Layout compartido: AppLayout, Sidebar, Topbar
│  ├─ components/ui/      # Componentes base reutilizables: Button, Card, Badge,
│  │                        StatusBadge, FormField, Table, Toast, Skeleton,
│  │                        EstadoError, PaginaProximamente...
│  ├─ features/
│  │  ├─ auth/            # AuthContext, ProtectedRoute, LoginPage
│  │  ├─ dashboard/        # DashboardPage + sus componentes (KpiCard, TendenciaChart...)
│  │  ├─ pruebas/          # (pendiente)
│  │  ├─ observaciones/    # (pendiente)
│  │  ├─ matrices/         # (pendiente)
│  │  └─ historias/        # (pendiente)
│  ├─ services/            # 1 función async por operación. Hoy devuelven mocks.
│  │                          Cada función tiene un comentario // TODO(backend): ...
│  │                          con el endpoint que se espera al conectar NestJS.
│  ├─ mocks/                # Datos simulados que consumen los services
│  ├─ types/                # Interfaces TS compartidas (fuente de verdad del contrato con el backend)
│  ├─ utils/                # exportarCsv, formatearFecha, useAsync, useDismiss, esperar/retardo
│  ├─ App.tsx               # Definición de rutas
│  └─ main.tsx
├─ .env.example
├─ tailwind.config.js
├─ vite.config.ts
└─ package.json
```

**Regla de la capa de servicios:** ningún componente importa `mocks/` directamente. Siempre se llama a una función de `services/*` (ej. `dashboardService.obtenerResumen(periodo)`), que hoy resuelve con datos mock y en el futuro hará el `fetch` real al backend.

---

## Rutas

| Ruta | Módulo | Estado |
|---|---|---|
| `/login` | Autenticación | ✅ Funcional |
| `/dashboard` | Dashboard — Resumen de Actividad | ✅ Funcional |
| `/pruebas`, `/pruebas/nueva`, `/pruebas/:id/ejecucion` | Pruebas | 🚧 Próximamente |
| `/observaciones`, `/observaciones/nueva`, `/observaciones/:id` | Observaciones | 🚧 Próximamente |
| `/matrices/marco`, `/matrices/carga`, `/matrices/mapeo`, `/matrices/resultado` | Matrices heurísticas | 🚧 Próximamente |
| `/historias`, `/historias/:id` | Historias de usuario | 🚧 Próximamente |
| `/configuracion` | Configuración | 🚧 Próximamente (fuera de alcance del proyecto) |

Todas las rutas excepto `/login` están protegidas por `ProtectedRoute`: si no hay sesión iniciada, redirigen a `/login`.

---

## Credenciales de prueba (mock)

```
Correo:      demo@ihc.com
Contraseña:  Demo1234
```

No existe backend de autenticación real: `authService.iniciarSesion` valida estas credenciales de forma local y guarda al usuario en `sessionStorage` mientras dura la pestaña.

---

## Cómo reemplazar un servicio mock por una llamada real

Cada archivo en `src/services/` expone funciones async con la forma final que va a tener la integración. Para conectar el backend NestJS:

1. Ubica la función en `services/` (por ejemplo, `dashboardService.obtenerResumen`).
2. Revisa el comentario `// TODO(backend): GET /dashboard/resumen?periodo=...` que indica el endpoint, método y parámetros esperados.
3. Reemplaza el cuerpo de la función, que hoy hace algo así:

   ```ts
   async obtenerResumen(periodo: Periodo): Promise<ResumenDashboard> {
     await retardo();
     return { /* datos mock */ };
   }
   ```

   por una llamada real usando `VITE_API_URL`, por ejemplo:

   ```ts
   async obtenerResumen(periodo: Periodo): Promise<ResumenDashboard> {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/resumen?periodo=${periodo}`);
     if (!res.ok) throw new Error('No pudimos cargar el resumen del dashboard.');
     return res.json();
   }
   ```

4. **No es necesario tocar los componentes.** Como todos consumen `services/*` (nunca `mocks/*` directamente) y los tipos de `types/` ya reflejan el contrato esperado, el cambio queda aislado en el archivo de servicio.
5. Elimina o conserva `mocks/` según convenga para pruebas y Storybook/tests, pero deja de ser la fuente de datos en producción.

> El detalle completo de cada endpoint (método, ruta, shape de request/response) vive en `HANDOFF_BACKEND.md`, en la raíz del repositorio.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el entorno de desarrollo |
| `npm run build` | Compila para producción (`tsc` + `vite build`) |
| `npm run preview` | Sirve localmente el build de producción |
| `npm run lint` | Corre ESLint |

---

## Accesibilidad y UX

El proyecto sigue Ley de Fitts, principios de Gestalt, las 10 heurísticas de Nielsen (mínimo 5 aplicadas y comentadas en el código) y POUR/WCAG AA. El detalle por módulo está en `NOTAS_UX.md`, en la raíz del repositorio.
