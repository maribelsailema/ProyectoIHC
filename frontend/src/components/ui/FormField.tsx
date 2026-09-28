import type { InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  etiqueta: string;
  error?: string;
  ayuda?: string;
}

export function FormField({ id, etiqueta, error, ayuda, className = '', ...rest }: Props) {
  const describedBy = [error ? `${id}-error` : '', ayuda ? `${id}-ayuda` : ''].filter(Boolean).join(' ');
  return (
    <div className="space-y-1.5">
      {/* Nielsen #3: label siempre visible, no solo placeholder.
          Gestalt: etiqueta en mayúsculas pequeñas = jerarquía tipográfica */}
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
        {etiqueta}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        className={`min-h-[44px] w-full rounded-lg border bg-white px-3 text-sm text-slate-900 placeholder:text-slate-500 ${
          error ? 'border-red-600' : 'border-slate-300'
        } ${className}`}
        {...rest}
      />
      {ayuda && !error && (
        <p id={`${id}-ayuda`} className="text-xs text-slate-600">
          {ayuda}
        </p>
      )}
      {error && (
        // POUR Perceptible: el error se comunica con ícono + texto, no solo con el borde rojo
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs font-medium text-red-700">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}