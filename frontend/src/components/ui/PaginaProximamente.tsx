import { Construction } from 'lucide-react';
import { Card } from './Card';

export function PaginaProximamente({ titulo }: { titulo: string }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{titulo}</h1>
      <Card className="flex flex-col items-center gap-3 py-16 text-center">
        <Construction className="h-10 w-10 text-brand-600" aria-hidden="true" />
        <p className="text-lg font-semibold">Próximamente</p>
        <p className="text-sm text-slate-600">Esta sección se construirá en un módulo posterior.</p>
      </Card>
    </div>
  );
}