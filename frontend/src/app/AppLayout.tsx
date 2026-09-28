import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Operable: enlace para saltar la navegación con teclado */}
      <a
        href="#contenido"
        className="sr-only z-50 rounded bg-brand-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-2 focus:top-2"
      >
        Saltar al contenido
      </a>

      <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onAbrirMenu={() => setMenuAbierto(true)} />
        {/* Gestalt: mismo ancho máximo y padding en todas las pantallas */}
        <main id="contenido" className="mx-auto w-full max-w-7xl flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
