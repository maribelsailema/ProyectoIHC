// ---------- Estados compartidos (un solo conjunto en toda la app) ----------
export type Estado =
  | 'Pendiente'
  | 'En proceso'
  | 'Completada'
  | 'En revisión'
  | 'Resuelto'
  | 'Borrador'
  | 'Aprobada';

// ---------- Dashboard ----------
export type Periodo = '7d' | '30d' | 'trimestre';
export type Tendencia = 'sube' | 'baja' | 'igual';
export type IdKpi = 'observaciones' | 'pruebas' | 'marcos' | 'historias';

export interface Kpi {
  id: IdKpi;
  titulo: string;
  valor: number;
  variacion: string;
  tendencia: Tendencia;
  subtitulo: string;
}

export interface PuntoTendencia {
  dia: string;
  observaciones: number;
  pruebas: number;
}

export interface ProyectoDestacado {
  id: string;
  nombre: string;
  progreso: number; // 0 a 100
}

export type TipoActividad = 'Observación' | 'Prueba' | 'Historia';

export interface Actividad {
  id: string; // OBS-001, TST-102, US-204
  proyecto: string;
  tipo: TipoActividad;
  estado: Estado;
  usuario: string;
  fecha: string; // ISO local, ej. 2026-09-28T09:15:00
}

export interface PaginaActividad {
  filas: Actividad[];
  hayMas: boolean;
}

export interface ResumenDashboard {
  periodo: Periodo;
  kpis: Kpi[];
  tendencia: PuntoTendencia[];
  proyectos: ProyectoDestacado[];
  sugerenciaIA: string;
  actividad: PaginaActividad;
}