import type { FiltrosMetricas as FiltrosType } from '@/services/metricasService';
import type { HeuristicaId, Severidad } from '@/types/observaciones';
import { HEURISTICA_LABEL, SEVERIDAD_LABEL } from '@/types/observaciones';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Props {
  filtros: FiltrosType;
  pruebas: { id: string; nombre: string }[];
  onCambiar: (f: FiltrosType) => void;
  onLimpiar: () => void;
}

const heuristicas: HeuristicaId[] = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10', 'P', 'O', 'U', 'R'];
const severidades: Severidad[] = [4, 3, 2, 1, 0];

export function FiltrosMetricas({ filtros, pruebas, onCambiar, onLimpiar }: Props) {
  const hayFiltrosActivos = Object.values(filtros).some((v) => v !== undefined && v !== '');

  return (
    // Gestalt (proximidad): todos los campos de filtro agrupados en una sola tarjeta
    <Card className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <div className="space-y-1.5">
        <label htmlFor="f-prueba" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Prueba
        </label>
        <select
          id="f-prueba"
          value={filtros.pruebaId ?? ''}
          onChange={(e) => onCambiar({ ...filtros, pruebaId: e.target.value || undefined })}
          className="min-h-[44px] w-full rounded-lg border border-slate-300 px-3 text-sm"
        >
          <option value="">Todas las pruebas</option>
          {pruebas.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="f-severidad" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Severidad
        </label>
        <select
          id="f-severidad"
          value={filtros.severidad ?? ''}
          onChange={(e) =>
            onCambiar({ ...filtros, severidad: e.target.value === '' ? undefined : (Number(e.target.value) as Severidad) })
          }
          className="min-h-[44px] w-full rounded-lg border border-slate-300 px-3 text-sm"
        >
          <option value="">Todas las severidades</option>
          {severidades.map((s) => (
            <option key={s} value={s}>{SEVERIDAD_LABEL[s]}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="f-heuristica" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Heurística
        </label>
        <select
          id="f-heuristica"
          value={filtros.heuristica ?? ''}
          onChange={(e) => onCambiar({ ...filtros, heuristica: (e.target.value || undefined) as HeuristicaId | undefined })}
          className="min-h-[44px] w-full rounded-lg border border-slate-300 px-3 text-sm"
        >
          <option value="">Todas las heurísticas</option>
          {heuristicas.map((h) => (
            <option key={h} value={h}>{HEURISTICA_LABEL[h]}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="f-desde" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Desde
        </label>
        <input
          id="f-desde"
          type="date"
          value={filtros.fechaDesde ?? ''}
          onChange={(e) => onCambiar({ ...filtros, fechaDesde: e.target.value || undefined })}
          className="min-h-[44px] w-full rounded-lg border border-slate-300 px-3 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="f-hasta" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Hasta
        </label>
        <input
          id="f-hasta"
          type="date"
          value={filtros.fechaHasta ?? ''}
          onChange={(e) => onCambiar({ ...filtros, fechaHasta: e.target.value || undefined })}
          className="min-h-[44px] w-full rounded-lg border border-slate-300 px-3 text-sm"
        />
      </div>

      <div className="sm:col-span-2 lg:col-span-5">
        {/* Fitts: destructiva/secundaria (sm), separada de las acciones principales de la página */}
        <Button variante="secondary" tamano="sm" onClick={onLimpiar} disabled={!hayFiltrosActivos}>
          Limpiar filtros
        </Button>
      </div>
    </Card>
  );
}