import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/useToast';
import { dashboardService } from '@/services/dashboardService';

export function SugerenciaIA({ texto }: { texto: string }) {
  const { mostrar } = useToast();
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState('');

  const analizar = async () => {
    setCargando(true);
    try {
      setResultado(await dashboardService.analizarCorrelacion());
    } catch {
      mostrar('error', 'No pudimos completar el análisis. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    // Tarjeta oscura reservada para IA (sistema de diseño)
    <Card variante="ia" className="space-y-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ia-300">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        Sugerencia de IA
      </p>
      <p className="text-sm leading-relaxed text-slate-100">{texto}</p>

      {/* aria-live: el resultado se anuncia cuando aparece (Nielsen #1) */}
      <div aria-live="polite">
        {resultado && <p className="rounded-lg bg-white/10 p-3 text-sm leading-relaxed text-white">{resultado}</p>}
      </div>

      <Button variante="inverse" cargando={cargando} onClick={analizar}>
        {cargando ? 'Analizando...' : 'Analizar correlación'}
      </Button>
      <p className="text-xs text-slate-300">Sugerencia automática: revísala antes de tomar decisiones.</p>
    </Card>
  );
}