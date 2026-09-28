import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FlaskConical, ClipboardList, Table2, FileText, Settings, BarChart3, X } from 'lucide-react';

const items = [
  { a: '/dashboard', texto: 'Dashboard', Icono: LayoutDashboard },
  { a: '/pruebas', texto: 'Pruebas', Icono: FlaskConical },
  { a: '/observaciones', texto: 'Observaciones', Icono: ClipboardList },
  { a: '/matrices', texto: 'Matrices heurísticas', Icono: Table2 },
  { a: '/historias', texto: 'Historias de usuario', Icono: FileText },
  { a: '/configuracion', texto: 'Configuración', Icono: Settings },
];

interface Props {
  abierto: boolean;
  onCerrar: () => void;
}

export function Sidebar({ abierto, onCerrar }: Props) {
  return (
    <>
      {/* Responsive: fondo oscuro al abrir el menú en móvil */}
      {abierto && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onCerrar} aria-hidden="true" />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          abierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">Dashboard</p>
              <p className="text-[11px] uppercase tracking-wider text-slate-600">Usabilidad</p>
            </div>
          </div>
          <button onClick={onCerrar} aria-label="Cerrar menú" className="rounded p-2 hover:bg-slate-100 lg:hidden">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navegación principal" className="flex-1 px-3">
          <ul className="space-y-1">
            {items.map(({ a, texto, Icono }) => (
              <li key={a}>
                {/* NavLink añade aria-current="page" automáticamente al ítem activo.
                    Fitts: ítems de 44px de alto. Reconocer antes que recordar: ícono + texto */}
                <NavLink
                  to={a}
                  onClick={onCerrar}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                      isActive ? 'bg-brand-100 text-brand-800' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icono className="h-5 w-5" aria-hidden="true" />
                  {texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className="p-5 text-[11px] font-medium uppercase tracking-wider text-slate-500">Versión 1.0.0</p>
      </aside>
    </>
  );
}