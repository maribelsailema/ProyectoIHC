import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type Variante = 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverse';
type Tamano = 'md' | 'sm';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamano?: Tamano;
  cargando?: boolean;
  icono?: ReactNode;
}

const variantes: Record<Variante, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 disabled:bg-slate-300 disabled:text-slate-600',
  secondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 disabled:text-slate-400',
  ghost: 'text-slate-700 hover:bg-slate-100 disabled:text-slate-400',
  danger: 'bg-white text-red-700 border border-red-300 hover:bg-red-50 disabled:text-red-300',
  inverse: 'bg-white text-brand-950 hover:bg-brand-100 disabled:bg-slate-300 disabled:text-slate-600',
};

// Fitts: "md" (acciones principales) mide mínimo 44px de alto y ancho.
// "sm" (secundarias/destructivas) es más pequeño para no competir.
const tamanos: Record<Tamano, string> = {
  md: 'min-h-[44px] min-w-[44px] px-5 text-sm',
  sm: 'min-h-[36px] px-3 text-xs',
};

export function Button({
  variante = 'primary',
  tamano = 'md',
  cargando = false,
  icono,
  children,
  disabled,
  className = '',
  ...rest
}: Props) {
  return (
    <button
      // Consistencia (Nielsen #4): un único componente de botón en toda la app
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed ${variantes[variante]} ${tamanos[tamano]} ${className}`}
      disabled={disabled || cargando}
      aria-busy={cargando}
      {...rest}
    >
      {cargando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : icono}
      {children}
    </button>
  );
}