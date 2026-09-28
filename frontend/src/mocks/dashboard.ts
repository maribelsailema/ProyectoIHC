import type { Actividad, Kpi, ProyectoDestacado, PuntoTendencia } from '@/types';

export const kpisMock: Kpi[] = [
  { id: 'observaciones', titulo: 'Total Observaciones', valor: 1284, variacion: '+12.5%', tendencia: 'sube', subtitulo: 'vs. período anterior' },
  { id: 'pruebas', titulo: 'Pruebas Activas', valor: 12, variacion: '+2', tendencia: 'sube', subtitulo: 'en ejecución esta semana' },
  { id: 'marcos', titulo: 'Marcos Heurísticos', valor: 4, variacion: '0%', tendencia: 'igual', subtitulo: 'sin cambios' },
  { id: 'historias', titulo: 'Historias de Usuario', valor: 86, variacion: '-4%', tendencia: 'baja', subtitulo: 'vs. período anterior' },
];

export const tendenciaMock: PuntoTendencia[] = [
  { dia: 'Lun', observaciones: 120, pruebas: 40 },
  { dia: 'Mar', observaciones: 165, pruebas: 62 },
  { dia: 'Mié', observaciones: 148, pruebas: 55 },
  { dia: 'Jue', observaciones: 210, pruebas: 88 },
  { dia: 'Vie', observaciones: 185, pruebas: 70 },
  { dia: 'Sáb', observaciones: 95, pruebas: 35 },
  { dia: 'Dom', observaciones: 70, pruebas: 28 },
];

export const proyectosMock: ProyectoDestacado[] = [
  { id: 'p1', nombre: 'E-commerce Redesign', progreso: 65 },
  { id: 'p2', nombre: 'Mobile App Onboarding', progreso: 32 },
  { id: 'p3', nombre: 'Checkout Optimization', progreso: 90 },
];

export const sugerenciaIAMock =
  'Las observaciones de severidad Mayor en Checkout Optimization se concentran en el paso de pago. Podría haber relación con las tareas que los participantes no lograron completar.';

export const actividadMock: Actividad[] = [
  { id: 'OBS-1284', proyecto: 'Checkout Optimization', tipo: 'Observación', estado: 'En revisión', usuario: 'Ana García', fecha: '2026-09-28T09:15:00' },
  { id: 'TST-112', proyecto: 'E-commerce Redesign', tipo: 'Prueba', estado: 'En proceso', usuario: 'Carlos Mena', fecha: '2026-09-28T08:40:00' },
  { id: 'US-204', proyecto: 'Mobile App Onboarding', tipo: 'Historia', estado: 'Borrador', usuario: 'Lucía Torres', fecha: '2026-09-27T17:20:00' },
  { id: 'OBS-1283', proyecto: 'E-commerce Redesign', tipo: 'Observación', estado: 'Resuelto', usuario: 'Diego Paredes', fecha: '2026-09-27T15:05:00' },
  { id: 'TST-111', proyecto: 'Checkout Optimization', tipo: 'Prueba', estado: 'Completada', usuario: 'Ana García', fecha: '2026-09-27T11:30:00' },
  { id: 'US-203', proyecto: 'Checkout Optimization', tipo: 'Historia', estado: 'Aprobada', usuario: 'Carlos Mena', fecha: '2026-09-26T16:45:00' },
  { id: 'OBS-1282', proyecto: 'Mobile App Onboarding', tipo: 'Observación', estado: 'Pendiente', usuario: 'Lucía Torres', fecha: '2026-09-26T14:10:00' },
  { id: 'TST-110', proyecto: 'Mobile App Onboarding', tipo: 'Prueba', estado: 'Pendiente', usuario: 'Diego Paredes', fecha: '2026-09-26T10:00:00' },
  { id: 'US-202', proyecto: 'E-commerce Redesign', tipo: 'Historia', estado: 'Pendiente', usuario: 'Ana García', fecha: '2026-09-25T18:25:00' },
  { id: 'OBS-1281', proyecto: 'Checkout Optimization', tipo: 'Observación', estado: 'Resuelto', usuario: 'Carlos Mena', fecha: '2026-09-25T12:50:00' },
  { id: 'OBS-1280', proyecto: 'E-commerce Redesign', tipo: 'Observación', estado: 'En revisión', usuario: 'Lucía Torres', fecha: '2026-09-24T17:00:00' },
  { id: 'TST-109', proyecto: 'E-commerce Redesign', tipo: 'Prueba', estado: 'Completada', usuario: 'Diego Paredes', fecha: '2026-09-24T09:35:00' },
  { id: 'US-201', proyecto: 'Mobile App Onboarding', tipo: 'Historia', estado: 'Aprobada', usuario: 'Ana García', fecha: '2026-09-23T16:15:00' },
  { id: 'OBS-1279', proyecto: 'Mobile App Onboarding', tipo: 'Observación', estado: 'Pendiente', usuario: 'Carlos Mena', fecha: '2026-09-23T11:05:00' },
  { id: 'TST-108', proyecto: 'Checkout Optimization', tipo: 'Prueba', estado: 'En proceso', usuario: 'Lucía Torres', fecha: '2026-09-22T15:40:00' },
];