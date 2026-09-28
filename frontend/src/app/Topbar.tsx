import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, Menu, Search } from 'lucide-react';
import { useAuth } from '@/features/auth/useAuth';
import { useToast } from '@/components/ui/useToast';

const nombres: Record<string, string> = {
  dashboard: 'Dashboard',
  pruebas: 'Pruebas',
  nueva: 'Nueva',
  ejecucion: 'Ejecución',
  observaciones: 'Observaciones',
  matrices: 'Matrices heurísticas',
  historias: 'Historias de usuario',
  configuracion: 'Configuración',
};

export function Topbar({ onAbrirMenu }: { onAbrirMenu: () => void }) {
  const { usuario, cerrarSesion } = useAuth();
  const { mostrar } = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);

  // Breadcrumb dinámico según la ruta (Nielsen #3: reconocer dónde estoy)
  const partes = pathname.split('/').filter(Boolean);
  const migas = partes.map((p, i) => ({
    texto: nombres[p] ?? p.toUpperCase(),
    a: '/' + partes.slice(0, i + 1).join('/'),
  }));

  // Operable: cerrar el dropdown con Escape o clic fuera
  useEffect(() => {
    if (!menu) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        botonRef.current?.focus();
      }
    };
    const clicFuera = (e: MouseEvent) => {
      if (!contRef.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener('keydown', tecla);
    document.addEventListener('mousedown', clicFuera);
    return () => {
      document.removeEventListener('keydown', tecla);
      document.removeEventListener('mousedown', clicFuera);
    };
  }, [menu]);

  const salir = async () => {
    await cerrarSesion();
    mostrar('info', 'Cerraste sesión correctamente.');
    navigate('/login', { replace: true });
  };

  if (!usuario) return null;

  return (
    <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:px-8">
      <button onClick={onAbrirMenu} aria-label="Abrir menú" className="rounded-lg p-2.5 hover:bg-slate-100 lg:hidden">
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <nav aria-label="Ruta de navegación" className="hidden text-sm sm:block">
        <ol className="flex items-center gap-2 text-slate-600">
          <li>
            <Link to="/dashboard" className="hover:text-brand-700 hover:underline">
              Inicio
            </Link>
          </li>
          {migas.map((m, i) => (
            <li key={m.a} className="flex items-center gap-2">
              <span aria-hidden="true">›</span>
              {i === migas.length - 1 ? (
                <span aria-current="page" className="font-semibold text-slate-900">
                  {m.texto}
                </span>
              ) : (
                <Link to={m.a} className="hover:text-brand-700 hover:underline">
                  {m.texto}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <div role="search" className="relative hidden md:block">
          <label htmlFor="buscador" className="sr-only">
            Buscar en la plataforma
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input
            id="buscador"
            type="search"
            placeholder="Buscar en la plataforma..."
            className="min-h-[44px] w-72 rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-500"
          />
        </div>

        <button aria-label="Notificaciones: tienes novedades sin leer" className="relative rounded-lg p-2.5 hover:bg-slate-100">
          <Bell className="h-5 w-5" aria-hidden="true" />
          {/* El punto es decorativo; el aria-label del botón ya comunica el estado */}
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-600" aria-hidden="true" />
        </button>

        <div ref={contRef} className="relative">
          <button
            ref={botonRef}
            onClick={() => setMenu((m) => !m)}
            aria-haspopup="menu"
            aria-expanded={menu}
            className="flex min-h-[44px] items-center gap-3 rounded-lg px-2 hover:bg-slate-100"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
              {usuario.iniciales}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" aria-hidden="true" />
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-semibold">{usuario.nombre}</span>
              <span className="block text-xs text-slate-600">{usuario.rol}</span>
            </span>
            <ChevronDown className="h-4 w-4 text-slate-600" aria-hidden="true" />
          </button>

          {menu && (
            <div role="menu" className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
              <button
                role="menuitem"
                onClick={salir}
                autoFocus
                className="flex min-h-[44px] w-full items-center gap-2 rounded-md px-3 text-sm text-slate-800 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}