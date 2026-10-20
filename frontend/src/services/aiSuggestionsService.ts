import type { AiSuggestion } from '@/types/observaciones';
import { retardo } from '@/utils/esperar';

interface AiSuggestionConId extends AiSuggestion {
  id: string;
}

const demoMock: AiSuggestionConId[] = [
  {
    id: 'sug-1',
    resumen:
      'Como investigadora UX, quiero filtrar las observaciones por heurística para priorizar los hallazgos más críticos antes de la retrospectiva.',
    clasificacion: 'Historia de usuario — Priorización',
    severidad: 3,
  },
  {
    id: 'sug-2',
    resumen:
      'Como participante, quiero recibir confirmación visual al completar una tarea para saber que mi respuesta fue registrada correctamente.',
    clasificacion: 'Historia de usuario — Confianza del sistema',
    severidad: 2,
  },
  {
    id: 'sug-3',
    resumen:
      'Como investigador, quiero exportar el mapeo heurístico de una prueba en PDF para compartirlo con el equipo de diseño sin depender de la plataforma.',
    clasificacion: 'Historia de usuario — Colaboración',
    severidad: 1,
  },
];

export const aiSuggestionsService = {
  // TODO(backend): GET /ia/sugerencias/demo -> AiSuggestionConId[]
  async listarDemo(): Promise<AiSuggestionConId[]> {
    await retardo();
    return demoMock;
  },

  // TODO(backend): PATCH /ia/sugerencias/:id  { resumen, clasificacion, severidad } -> AiSuggestion
  async guardar(id: string, datos: AiSuggestion): Promise<void> {
    void id;
    void datos;
    await retardo();
  },

  // TODO(backend): POST /ia/sugerencias/:id/aprobar -> { aprobada: true }
  async aprobar(id: string): Promise<void> {
    void id;
    await retardo();
  },

  // TODO(backend): DELETE /ia/sugerencias/:id
  async descartar(id: string): Promise<void> {
    void id;
    await retardo();
  },
};