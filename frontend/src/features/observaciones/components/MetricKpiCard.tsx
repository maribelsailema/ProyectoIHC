import type { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

export function MetricKpiCard({ titulo, valor, icono }: { titulo: string; valor: string; icono: ReactNode }) {
  return (
    <Card className="space-y-2">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">{icono}</span>
      {/* Gestalt: jerarquía título (etiqueta) > valor grande */}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">{titulo}</h3>
      <p className="text-3xl font-bold">{valor}</p>
    </Card>
  );
}