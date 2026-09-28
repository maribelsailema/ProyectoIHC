import { createContext, useCallback, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type Tipo = 'exito' | 'error' | 'info';
interface ToastItem {
  id: number;
  tipo: Tipo;
  mensaje: string;
}

export const ToastContext = createContext<{ mostrar: (tipo: Tipo, mensaje: string) => void } | null>(null);

const estilos: Record<Tipo, { clase: string; Icono: typeof Info }> = {
  exito: { clase: 'border-emerald-300 bg-emerald-50 text-emerald-900', Icono: CheckCircle2 },
  error: { clase: 'border-red-300 bg-red-50 text-red-900', Icono: AlertCircle },
  info: { clase: 'border-brand-300 bg-brand-50 text-brand-900', Icono: Info },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const cerrar = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  const mostrar = useCallback((tipo: Tipo, mensaje: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, tipo, mensaje }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrar }}>
      {children}
      {/* Nielsen #1: visibilidad del estado. aria-live anuncia el mensaje a lectores de pantalla */}
      <div role="status" aria-live="polite" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(({ id, tipo, mensaje }) => {
          const { clase, Icono } = estilos[tipo];
          return (
            <div key={id} className={`flex items-start gap-3 rounded-lg border p-3 shadow-lg ${clase}`}>
              <Icono className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium">{mensaje}</p>
              <button
                onClick={() => cerrar(id)}
                aria-label="Cerrar notificación"
                className="ml-2 rounded p-1 hover:bg-black/5"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}