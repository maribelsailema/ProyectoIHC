import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from './Card';

interface Props {
  titulo: string;
  accion?: { href: string; texto: string };
}

export function PaginaProximamente({ titulo, accion }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{titulo}</h1>
      <Card className="flex flex-col items-center gap-3 py-16 text-center">
        <Construction className="h-10 w-10 text-brand-600" aria-hidden="true" />
        <p className="text-lg font-semibold">Próximamente</p>
        <p className="text-sm text-slate-600">Esta sección se construirá en un módulo posterior.</p>
        {accion && (
          <Link
            to={accion.href}
            className="mt-2 inline-flex min-h-[44px] items-center rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {accion.texto}
          </Link>
        )}
      </Card>
    </div>
  );
}