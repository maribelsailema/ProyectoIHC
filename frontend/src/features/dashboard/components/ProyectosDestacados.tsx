import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ProyectoDestacado } from '@/types';
import { Card } from '@/components/ui/Card';

export function ProyectosDestacados({ proyectos }: { proyectos: ProyectoDestacado[] }) {
  return (
    <Card className="space-y-5">
      <h2 className="text-lg font-bold">Proyectos destacados</h2>

      {proyectos.length === 0 ? (
        <p className="text-sm text-slate-600">Aún no hay proyectos. Crea una prueba para comenzar.</p>
      ) : (
        <ul className="space-y-4">
          {proyectos.map((p) => (
            <li key={p.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{p.nombre}</span>
                {/* El porcentaje también va en texto: no depende de la barra */}
                <span className="font-semibold text-slate-700">{p.progreso}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={p.progreso}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progreso de ${p.nombre}`}
                className="h-2.5 overflow-hidden rounded-full bg-slate-200"
              >
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${p.progreso}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/pruebas"
        className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
      >
        Ver todos los proyectos
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </Card>
  );
}