import { useCallback, useEffect, useState } from 'react';
import { ClipboardList, FlaskConical, Gauge, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EstadoError } from '@/components/ui/EstadoError';
import { Skeleton } from '@/components/ui/Skeleton';
import { metricasService, type FiltrosMetricas as FiltrosType } from '@/services/metricasService';
import { useAsync } from '@/utils/useAsync';
import { FiltrosMetricas } from './components/FiltrosMetricas';
import { MetricKpiCard } from './components/MetricKpiCard';
import { SeveridadBarChart } from './components/SeveridadBarChart';
import { TendenciaLineChart } from './components/TendenciaLineChart';
import { TopHallazgos } from './components/TopHallazgos';

const FILTROS_VACIOS: FiltrosType = {};

export default function MetricasPage() {
  const [filtros, setFiltros] = useState<FiltrosType>(FILTROS_VACIOS);
  const [pruebas, setPruebas] = useState<{ id: string; nombre: string }[]>([]);

  const obtener = useCallback(() => metricasService.obtenerPanel(filtros), [filtros]);
  const { data, cargando, error, recargar } = useAsync(obtener);

  useEffect(() => {
    metricasService.listarPruebasOpciones().then(setPruebas);
  }, []);

  const hayFiltrosActivos = Object.values(filtros).some((v) => v !== undefined && v !== '');

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">HU-4.1 · HU-4.2</p>
        <h1 className="text-2xl font-bold">Métricas y hallazgos frecuentes</h1>
        <p className="mt-1 text-sm text-slate-600">Analiza severidad, heurísticas y tendencias de las observaciones registradas.</p>
      </header>

      <FiltrosMetricas
        filtros={filtros}
        pruebas={pruebas}
        onCambiar={setFiltros}
        onLimpiar={() => setFiltros(FILTROS_VACIOS)}
      />

      {error ? (
        <EstadoError mensaje={error} onReintentar={recargar} />
      ) : cargando || !data ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Card key={i}><Skeleton className="h-16 w-full" /></Card>
            ))}
          </div>
          <Card><Skeleton className="h-72 w-full" /></Card>
        </div>
      ) : data.observaciones.length === 0 ? (
        // Nielsen: estado vacío con ayuda para salir de él, no un simple "no hay datos"
        <Card className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-lg font-semibold">No hay observaciones con estos filtros</p>
          <p className="max-w-md text-sm text-slate-600">Prueba a ampliar el rango de fechas o quitar algún filtro.</p>
          {hayFiltrosActivos && (
            <Button variante="secondary" onClick={() => setFiltros(FILTROS_VACIOS)}>Limpiar filtros</Button>
          )}
        </Card>
      ) : (
        <>
          <p className="text-sm text-slate-600" aria-live="polite">
            Mostrando {data.kpis.observaciones} de {data.totalSinFiltrar} observaciones
          </p>

          <section aria-label="Indicadores clave" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricKpiCard titulo="Pruebas representadas" valor={String(data.kpis.pruebas)} icono={<FlaskConical className="h-5 w-5" aria-hidden="true" />} />
            <MetricKpiCard titulo="Observaciones" valor={String(data.kpis.observaciones)} icono={<ClipboardList className="h-5 w-5" aria-hidden="true" />} />
            <MetricKpiCard titulo="Severidad promedio" valor={data.kpis.severidadPromedio.toFixed(1)} icono={<Gauge className="h-5 w-5" aria-hidden="true" />} />
            <MetricKpiCard titulo="% severidad alta" valor={`${data.kpis.porcentajeSeveridadAlta}%`} icono={<TrendingUp className="h-5 w-5" aria-hidden="true" />} />
          </section>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <SeveridadBarChart observaciones={data.observaciones} />
              <TendenciaLineChart observaciones={data.observaciones} />
            </div>
            <TopHallazgos datos={data.topHallazgos} />
          </div>
        </>
      )}
    </div>
  );
}