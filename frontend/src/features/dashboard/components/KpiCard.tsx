import { ClipboardList, FlaskConical, FileText, Minus, Table2, TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react';
import type { IdKpi, Kpi, Tendencia } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const iconos: Record<IdKpi, LucideIcon> = {
  observaciones: ClipboardList,
  pruebas: FlaskConical,
  marcos: Table2,
  historias: FileText,
};

// POUR Perceptible: la variación lleva ícono + signo + texto oculto, no solo color
const tendencias: Record<Tendencia, { Icono: LucideIcon; clase: string; texto: string }> = {
  sube: { Icono: TrendingUp, clase: 'bg-emerald-100 text-emerald-900', texto: 'aumento' },
  baja: { Icono: TrendingDown, clase: 'bg-red-100 text-red-900', texto: 'disminución' },
  igual: { Icono: Minus, clase: 'bg-slate-200 text-slate-800', texto: 'sin cambios' },
};

const numero = new Intl.NumberFormat('en-US'); // DECISIÓN: "1,284" como en el boceto

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icono = iconos[kpi.id];
  const t = tendencias[kpi.tendencia];
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icono className="h-5 w-5" aria-hidden="true" />
        </span>
        <Badge className={t.clase}>
          <t.Icono className="h-3.5 w-3.5" aria-hidden="true" />
          {kpi.variacion}
          <span className="sr-only"> ({t.texto})</span>
        </Badge>
      </div>
      <div>
        {/* Gestalt: jerarquía título (etiqueta) > valor (grande) > subtítulo */}
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">{kpi.titulo}</h3>
        <p className="mt-1 text-3xl font-bold">{numero.format(kpi.valor)}</p>
        <p className="mt-1 text-xs text-slate-600">{kpi.subtitulo}</p>
      </div>
    </Card>
  );
}