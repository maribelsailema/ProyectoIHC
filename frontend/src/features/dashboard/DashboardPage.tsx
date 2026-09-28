import { useCallback, useState } from 'react';
import { FileBarChart } from 'lucide-react';
import type { Actividad, Periodo } from '@/types';
import { useAuth } from '@/features/auth/useAuth';
import { Button } from '@/components/ui/Button';
import { EstadoError } from '@/components/ui/EstadoError';
import { useToast } from '@/components/ui/useToast';
import { dashboardService } from '@/services/dashboardService';
import { exportarCsv } from '@/utils/exportarCsv';
import { formatearFecha } from '@/utils/formatearFecha';
import { useAsync } from '@/utils/useAsync';
import { AccesosRapidos } from './components/AccesosRapidos';
import { ActividadReciente } from './components/ActividadReciente';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { FiltroPeriodo, textoPeriodo } from './components/FiltroPeriodo';
import { KpiCard } from './components/KpiCard';
import { ProyectosDestacados } from './components/ProyectosDestacados';
import { SugerenciaIA } from './components/SugerenciaIA';
import { TendenciaChart } from './components/TendenciaChart';

export default function DashboardPage() {
  const { usuario } = useAuth();
  const { mostrar } = useToast();
  const [periodo, setPeriodo] = useState<Periodo>('7d');
  const [extras, setExtras] = useState<Actividad[]>([]);
  const [pagina, setPagina] = useState(1);
  const [hayMasExtra, setHayMasExtra] = useState<boolean | null>(null);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [generando, setGenerando] = useState(false);

  const obtener = useCallback(() => dashboardService.obtenerResumen(periodo), [periodo]);
  const { data, cargando, error, recargar } = useAsync(obtener);

  const cambiarPeriodo = (p: Periodo) => {
    setPeriodo(p);
    // Al cambiar de período la tabla vuelve a la primera página
    setExtras([]);
    setPagina(1);
    setHayMasExtra(null);
  };

  const filas = data ? [...data.actividad.filas, ...extras] : [];
  const hayMas = hayMasExtra ?? data?.actividad.hayMas ?? false;

  const cargarMas = async () => {
    setCargandoMas(true);
    try {
      const siguiente = pagina + 1;
      const res = await dashboardService.listarActividad(siguiente);
      setExtras((e) => [...e, ...res.filas]);
      setPagina(siguiente);
      setHayMasExtra(res.hayMas);
    } catch {
      // Nielsen #5: mensaje específico y qué hacer
      mostrar('error', 'No pudimos cargar más actividad. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setCargandoMas(false);
    }
  };

  const exportarActividad = () => {
    exportarCsv(
      'actividad-reciente',
      filas.map((f) => ({
        ID: f.id,
        Proyecto: f.proyecto,
        Tipo: f.tipo,
        Estado: f.estado,
        Usuario: f.usuario,
        Fecha: formatearFecha(f.fecha),
      })),
    );
    mostrar('exito', `Se exportaron ${filas.length} registros a CSV.`);
  };

  const generarReporte = async () => {
    if (!data) return;
    setGenerando(true);
    try {
      await dashboardService.generarReporte(periodo);
      exportarCsv(
        `reporte-${periodo}`,
        data.kpis.map((k) => ({ Indicador: k.titulo, Valor: k.valor, 'Variación': k.variacion })),
      );
      mostrar('exito', 'Reporte generado. La descarga comenzó.');
    } catch {
      mostrar('error', 'No pudimos generar el reporte. Inténtalo de nuevo en unos segundos.');
    } finally {
      setGenerando(false);
    }
  };

  const nombre = usuario?.nombre.split(' ')[0] ?? '';

  return (
    <div className="space-y-8">
      {/* Fitts: acción principal (Generar Reporte) arriba a la derecha del título, como en el boceto.
          Gestalt: los dos botones del encabezado quedan agrupados por proximidad. */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Resumen de Actividad</h1>
          <p className="mt-1 text-sm text-slate-600">
            Bienvenido de nuevo, {nombre}. Período: <span className="font-semibold text-slate-800">{textoPeriodo[periodo]}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <FiltroPeriodo valor={periodo} onCambiar={cambiarPeriodo} />
          <Button
            icono={<FileBarChart className="h-4 w-4" aria-hidden="true" />}
            cargando={generando}
            disabled={!data}
            onClick={generarReporte}
          >
            {generando ? 'Generando...' : 'Generar Reporte'}
          </Button>
        </div>
      </header>

      {error ? (
        <EstadoError mensaje={error} onReintentar={recargar} />
      ) : cargando || !data ? (
        <DashboardSkeleton />
      ) : (
        <>
          <section aria-label="Indicadores clave" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.kpis.map((k) => (
              <KpiCard key={k.id} kpi={k} />
            ))}
          </section>

          {/* Grilla consistente de 3 columnas: gráfico (2) + columna lateral (1) */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TendenciaChart datos={data.tendencia} />
            </div>
            <div className="space-y-6">
              <ProyectosDestacados proyectos={data.proyectos} />
              <SugerenciaIA texto={data.sugerenciaIA} />
            </div>
          </div>

          <ActividadReciente
            filas={filas}
            hayMas={hayMas}
            cargandoMas={cargandoMas}
            onCargarMas={cargarMas}
            onExportar={exportarActividad}
          />
        </>
      )}

      <AccesosRapidos />
    </div>
  );
}