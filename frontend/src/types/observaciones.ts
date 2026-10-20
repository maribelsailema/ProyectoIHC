// Contrato de datos provisional para Evaluaciones / IA (HU-4.1, HU-4.2, HU-5.4).
// Aislado aquí para reemplazarlo fácilmente cuando el backend NestJS exponga el contrato real.

export type Severidad = 0 | 1 | 2 | 3 | 4;

export const SEVERIDAD_LABEL: Record<Severidad, string> = {
  4: 'Catastrófico',
  3: 'Mayor',
  2: 'Menor',
  1: 'Cosmético',
  0: 'No es un problema',
};

export type HeuristicaId =
  | 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'N6' | 'N7' | 'N8' | 'N9' | 'N10'
  | 'P' | 'O' | 'U' | 'R';

export const HEURISTICA_LABEL: Record<HeuristicaId, string> = {
  N1: 'N1 · Visibilidad del estado del sistema',
  N2: 'N2 · Correspondencia con el mundo real',
  N3: 'N3 · Control y libertad del usuario',
  N4: 'N4 · Consistencia y estándares',
  N5: 'N5 · Prevención de errores',
  N6: 'N6 · Reconocer antes que recordar',
  N7: 'N7 · Flexibilidad y eficiencia de uso',
  N8: 'N8 · Diseño estético y minimalista',
  N9: 'N9 · Ayuda a reconocer y recuperarse de errores',
  N10: 'N10 · Ayuda y documentación',
  P: 'POUR · Perceptible',
  O: 'POUR · Operable',
  U: 'POUR · Comprensible',
  R: 'POUR · Robusto',
};

export interface Observation {
  id: string; // OBS-xxx
  testId: string; // TST-xxx
  descripcion: string;
  severidad: Severidad;
  heuristica: HeuristicaId;
  fecha: string; // ISO
}

export interface AiSuggestion {
  resumen: string;
  clasificacion: string;
  severidad: Severidad;
}