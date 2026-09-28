import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** "ia" = tarjeta oscura reservada para elementos de IA */
  variante?: 'default' | 'ia';
}

export function Card({ variante = 'default', className = '', ...rest }: Props) {
  const estilos =
    variante === 'ia'
      ? 'bg-brand-950 text-white border border-ia-500/40'
      : 'bg-white text-slate-900 border border-slate-200';
  // Gestalt (proximidad/cierre): la tarjeta agrupa visualmente contenido relacionado
  return <div className={`rounded-card p-6 shadow-sm ${estilos} ${className}`} {...rest} />;
}