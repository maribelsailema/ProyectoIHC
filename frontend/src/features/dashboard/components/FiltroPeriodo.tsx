import { useCallback, useRef, useState } from 'react';
import { CalendarDays, Check } from 'lucide-react';
import type { Periodo } from '@/types';
import { Button } from '@/components/ui/Button';
import { useDismiss } from '@/utils/useDismiss';

export const textoPeriodo: Record<Periodo, string> = {
  '7d': 'Últimos 7 días',
  '30d': 'Últimos 30 días',
  trimestre: 'Este trimestre',
};

export function FiltroPeriodo({ valor, onCambiar }: { valor: Periodo; onCambiar: (p: Periodo) => void }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cerrar = useCallback(() => setAbierto(false), []);
  useDismiss(abierto, cerrar, ref);

  return (
    <div ref={ref} className="relative">
      <Button
        variante="secondary"
        icono={<CalendarDays className="h-4 w-4" aria-hidden="true" />}
        aria-haspopup="menu"
        aria-expanded={abierto}
        onClick={() => setAbierto((a) => !a)}
      >
        Filtrar período
      </Button>
      {abierto && (
        <div role="menu" aria-label="Período" className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
          {(Object.keys(textoPeriodo) as Periodo[]).map((p) => (
            <button
              key={p}
              role="menuitemradio"
              aria-checked={p === valor}
              onClick={() => {
                onCambiar(p);
                cerrar();
              }}
              className="flex min-h-[44px] w-full items-center justify-between rounded-md px-3 text-sm hover:bg-slate-100"
            >
              {textoPeriodo[p]}
              {/* El seleccionado se marca con ícono, no solo con color */}
              {p === valor && <Check className="h-4 w-4 text-brand-700" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}