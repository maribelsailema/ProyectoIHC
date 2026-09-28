import { useEffect, type RefObject } from 'react';

// Operable (POUR): todo desplegable se cierra con teclado
export function useDismiss(abierto: boolean, onCerrar: () => void, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!abierto) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    const clic = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onCerrar();
    };
    document.addEventListener('keydown', tecla);
    document.addEventListener('mousedown', clic);
    return () => {
      document.removeEventListener('keydown', tecla);
      document.removeEventListener('mousedown', clic);
    };
  }, [abierto, onCerrar, ref]);
}