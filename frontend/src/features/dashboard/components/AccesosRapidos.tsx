import { Link } from 'react-router-dom';
import { ClipboardList, FileText, FlaskConical, type LucideIcon } from 'lucide-react';

const accesos: { a: string; titulo: string; detalle: string; Icono: LucideIcon }[] = [
  { a: '/pruebas/nueva', titulo: 'Nueva Prueba', detalle: 'Configura una prueba de usabilidad', Icono: FlaskConical },
  { a: '/observaciones/nueva', titulo: 'Registrar Hallazgo', detalle: 'Documenta un problema encontrado', Icono: ClipboardList },
  { a: '/historias', titulo: 'Generar Historias', detalle: 'Crea historias de usuario con IA', Icono: FileText },
];

export function AccesosRapidos() {
  return (
    <section aria-labelledby="accesos-titulo" className="space-y-3">
      <h2 id="accesos-titulo" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
        Accesos rápidos
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {accesos.map(({ a, titulo, detalle, Icono }) => (
          // Borde punteado = acción de "agregar" (sistema de diseño).
          // Fitts: el área clicable es toda la tarjeta (mínimo 88px de alto).
          <Link
            key={a}
            to={a}
            className="flex min-h-[88px] items-center gap-4 rounded-card border-2 border-dashed border-slate-300 bg-white p-5 transition-colors hover:border-brand-500 hover:bg-brand-50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <Icono className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold">{titulo}</span>
              <span className="block text-sm text-slate-600">{detalle}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}