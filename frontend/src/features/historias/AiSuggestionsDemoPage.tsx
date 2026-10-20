import { useCallback, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { EstadoError } from '@/components/ui/EstadoError';
import { Skeleton } from '@/components/ui/Skeleton';
import { aiSuggestionsService } from '@/services/aiSuggestionsService';
import { useAsync } from '@/utils/useAsync';
import { AiSuggestionCard } from './components/AiSuggestionCard';

export default function AiSuggestionsDemoPage() {
  const obtener = useCallback(() => aiSuggestionsService.listarDemo(), []);
  const { data, cargando, error, recargar } = useAsync(obtener);
  const [descartadas, setDescartadas] = useState<Set<string>>(new Set());

  const marcarDescartada = (id: string) => setDescartadas((s) => new Set(s).add(id));

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-ia-700">HU-5.4 · Demostración</p>
        <h1 className="text-2xl font-bold">Sugerencias de IA para historias de usuario</h1>
        <p className="mt-1 text-sm text-slate-600">Cada tarjeta es editable: revisa, ajusta y aprueba o descarta la sugerencia generada.</p>
      </header>

      {error ? (
        <EstadoError mensaje={error} onReintentar={recargar} />
      ) : cargando || !data ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-full" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.filter((s) => !descartadas.has(s.id)).map((s) => (
            <AiSuggestionCard
              key={s.id}
              id={s.id}
              sugerenciaInicial={{ resumen: s.resumen, clasificacion: s.clasificacion, severidad: s.severidad }}
              onDescartada={marcarDescartada}
            />
          ))}
          {data.length > 0 && data.every((s) => descartadas.has(s.id)) && (
            <p className="col-span-full text-sm text-slate-600">Descartaste todas las sugerencias de esta demostración.</p>
          )}
        </div>
      )}
    </div>
  );
}