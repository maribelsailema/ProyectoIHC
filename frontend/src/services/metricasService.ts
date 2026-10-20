import type { HeuristicaId, Observation, Severidad } from '@/types/observaciones';
import { observacionesMock, pruebasMock } from '@/mocks/observaciones';
import { retardo } from '@/utils/esperar';

export interface FiltrosMetricas {
  pruebaId?: string;
  severidad?: Severidad;
  heuristica?: HeuristicaId;
  fechaDesde?: string; // yyyy-mm-dd
  fechaHasta?: string; // yyyy-mm-dd
}

export interface TopHallazgo {
  heuristica: HeuristicaId;
  conteo: number;
}

export interface PanelMetricas {
  totalSinFiltrar: number;
  observaciones: Observation[];
  kpis: {
    pruebas: number;
    observaciones: number;
    severidadPromedio: number;
    // DECISIÓN: "severidad alta" = Mayor (3) o Catastrófico (4), según la escala única del proyecto.
    porcentajeSeveridadAlta: number;
  };
  topHallazgos: TopHallazgo[];
}

function aplicarFiltros(filtros: FiltrosMetricas): Observation[] {
  return observacionesMock.filter((o) => {
    if (filtros.pruebaId && o.testId !== filtros.pruebaId) return false;
    if (filtros.severidad !== undefined && o.severidad !== filtros.severidad) return false;
    if (filtros.heuristica && o.heuristica !== filtros.heuristica) return false;
    if (filtros.fechaDesde && o.fecha < filtros.fechaDesde) return false;
    if (filtros.fechaHasta && o.fecha > `${filtros.fechaHasta}T23:59:59`) return false;
    return true;
  });
}

export const metricasService = {
  // TODO(backend): GET /metricas?pruebaId=&severidad=&heuristica=&desde=&hasta=
  async obtenerPanel(filtros: FiltrosMetricas): Promise<PanelMetricas> {
    await retardo();
    const filtradas = aplicarFiltros(filtros);

    const severidadPromedio = filtradas.length
      ? filtradas.reduce((acc, o) => acc + o.severidad, 0) / filtradas.length
      : 0;
    const altas = filtradas.filter((o) => o.severidad >= 3).length;

    const conteoPorHeuristica = new Map<HeuristicaId, number>();
    filtradas.forEach((o) => conteoPorHeuristica.set(o.heuristica, (conteoPorHeuristica.get(o.heuristica) ?? 0) + 1));
    const topHallazgos = [...conteoPorHeuristica.entries()]
      .map(([heuristica, conteo]) => ({ heuristica, conteo }))
      .sort((a, b) => b.conteo - a.conteo)
      .slice(0, 5);

    return {
      totalSinFiltrar: observacionesMock.length,
      observaciones: filtradas,
      kpis: {
        pruebas: new Set(filtradas.map((o) => o.testId)).size,
        observaciones: filtradas.length,
        severidadPromedio: Number(severidadPromedio.toFixed(1)),
        porcentajeSeveridadAlta: filtradas.length ? Number(((altas / filtradas.length) * 100).toFixed(0)) : 0,
      },
      topHallazgos,
    };
  },

  // TODO(backend): GET /pruebas/opciones -> { id, nombre }[]
  async listarPruebasOpciones() {
    await retardo();
    return pruebasMock;
  },
};