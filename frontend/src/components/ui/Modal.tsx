import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface Props {
  abierto: boolean;
  titulo: string;
  descripcion?: string;
  onCerrar: () => void;
  confirmarTexto?: string;
  confirmarVariante?: 'primary' | 'danger';
  onConfirmar?: () => void;
  cargando?: boolean;
}

export function Modal({ abierto, titulo, descripcion, onCerrar, confirmarTexto, confirmarVariante = 'primary', onConfirmar, cargando }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const foco = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!abierto) return;
    foco.current = document.activeElement as HTMLElement;
    ref.current?.focus();

    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
      // Operable: foco atrapado dentro del modal mientras está abierto
      if (e.key === 'Tab' && ref.current) {
        const focosables = ref.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focosables.length === 0) return;
        const primero = focosables[0];
        const ultimo = focosables[focosables.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    };
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('keydown', tecla);
      foco.current?.focus(); // devuelve el foco al disparador al cerrar
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        aria-describedby={descripcion ? 'modal-descripcion' : undefined}
        tabIndex={-1}
        className="w-full max-w-md rounded-card bg-white p-6 shadow-xl outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-titulo" className="text-lg font-bold">{titulo}</h2>
          <button onClick={onCerrar} aria-label="Cerrar" className="rounded p-1.5 hover:bg-slate-100">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {descripcion && (
          <p id="modal-descripcion" className="mt-2 text-sm text-slate-600">{descripcion}</p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <Button variante="secondary" onClick={onCerrar}>Cancelar</Button>
          {onConfirmar && (
            <Button variante={confirmarVariante} onClick={onConfirmar} cargando={cargando}>
              {confirmarTexto ?? 'Confirmar'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}