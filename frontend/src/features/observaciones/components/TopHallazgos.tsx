import type { TopHallazgo } from '@/services/metricasService';
import { HEURISTICA_LABEL } from '@/types/observaciones';
import { Card } from '@/components/ui/Card';

export function TopHallazgos({ datos }: { datos: TopHallazgo[] }) {
  const maximo = Math.max(1, ...datos.map((d) => d.conteo));
  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-bold">Hallazgos más frecuentes</h2>
      {datos.length === 0 ? (
        <p className="text-sm text-slate-600">No hay hallazgos para los filtros actuales.</p>
      ) : (
        <ol className="space-y-3">
          {datos.map((d, i) => (
            <li key={d.heuristica} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {i + 1}. {HEURISTICA_LABEL[d.heuristica]}
                </span>
                {/* El conteo también va en texto, la barra es solo apoyo visual */}
                <span className="font-semibold text-slate-700">{d.conteo}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${(d.conteo / maximo) * 100}%` }} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}