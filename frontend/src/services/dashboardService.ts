import type { PaginaActividad, Periodo, ResumenDashboard } from '@/types';
import { actividadMock, kpisMock, proyectosMock, sugerenciaIAMock, tendenciaMock } from '@/mocks/dashboard';
import { retardo, esperar } from '@/utils/esperar';

const TAMANO_PAGINA = 5;

function paginar(pagina: number): PaginaActividad {
  const inicio = (pagina - 1) * TAMANO_PAGINA;
  return {
    filas: actividadMock.slice(inicio, inicio + TAMANO_PAGINA),
    hayMas: inicio + TAMANO_PAGINA < actividadMock.length,
  };
}

export const dashboardService = {
  // TODO(backend): GET /dashboard/resumen?periodo=7d|30d|trimestre
  //   -> ResumenDashboard (kpis, tendencia, proyectos, sugerenciaIA, actividad página 1)
  async obtenerResumen(periodo: Periodo): Promise<ResumenDashboard> {
    await retardo();
    return {
      periodo,
      kpis: kpisMock,
      tendencia: tendenciaMock,
      proyectos: proyectosMock,
      sugerenciaIA: sugerenciaIAMock,
      actividad: paginar(1),
    };
  },

  // TODO(backend): GET /actividad?pagina=2&tamano=5 -> { filas: Actividad[], hayMas: boolean }
  async listarActividad(pagina: number): Promise<PaginaActividad> {
    await retardo();
    return paginar(pagina);
  },

  // TODO(backend): POST /reportes  { periodo } -> archivo o URL de descarga
  // DECISIÓN: en el mock el "reporte" es un CSV con los KPIs, generado en el cliente.
  async generarReporte(periodo: Periodo): Promise<void> {
    void periodo;
    await esperar(900);
  },

  // TODO(backend): POST /ia/analizar-correlacion -> { resultado: string }
  // La IA se simula con datos fijos, siempre marcada como "sugerencia".
  async analizarCorrelacion(): Promise<string> {
    await esperar(1500);
    return 'Correlación moderada: el 68% de las observaciones Mayores de Checkout Optimization coinciden con tareas de pago no completadas. Conviene revisar primero el formulario de tarjeta.';
  },
};