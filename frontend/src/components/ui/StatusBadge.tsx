import { BadgeCheck, CheckCircle2, Clock, Eye, PencilLine, PlayCircle, type LucideIcon } from 'lucide-react';
import type { Estado } from '@/types';
import { Badge } from './Badge';

// POUR Perceptible: el estado se comunica con ícono + texto + color, nunca solo color.
// Todos los textos usan tono 800 sobre fondo 100 (contraste AA).
const config: Record<Estado, { Icono: LucideIcon; clase: string }> = {
  Pendiente: { Icono: Clock, clase: 'bg-amber-100 text-amber-900' },
  'En proceso': { Icono: PlayCircle, clase: 'bg-brand-100 text-brand-900' },
  Completada: { Icono: CheckCircle2, clase: 'bg-emerald-100 text-emerald-900' },
  'En revisión': { Icono: Eye, clase: 'bg-ia-100 text-ia-900' },
  Resuelto: { Icono: CheckCircle2, clase: 'bg-emerald-100 text-emerald-900' },
  Borrador: { Icono: PencilLine, clase: 'bg-slate-200 text-slate-800' },
  Aprobada: { Icono: BadgeCheck, clase: 'bg-emerald-100 text-emerald-900' },
};

export function StatusBadge({ estado }: { estado: Estado }) {
  const { Icono, clase } = config[estado];
  return (
    <Badge className={clase}>
      <Icono className="h-3.5 w-3.5" aria-hidden="true" />
      {estado}
    </Badge>
  );
}