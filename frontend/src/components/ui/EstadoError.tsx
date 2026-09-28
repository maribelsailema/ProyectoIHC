import { AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

// Nielsen #5: mensaje específico + una salida clara (Reintentar)
export function EstadoError({ mensaje, onReintentar }: { mensaje: string; onReintentar: () => void }) {
  return (
    <Card role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
      <AlertCircle className="h-10 w-10 text-red-600" aria-hidden="true" />
      <p className="text-lg font-semibold">No pudimos cargar esta sección</p>
      <p className="max-w-md text-sm text-slate-600">{mensaje}</p>
      <Button variante="secondary" onClick={onReintentar}>
        Reintentar
      </Button>
    </Card>
  );
}