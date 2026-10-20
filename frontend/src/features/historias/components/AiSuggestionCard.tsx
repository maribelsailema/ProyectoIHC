import { useState } from 'react';
import { Check, Pencil, RotateCcw, Sparkles, Trash2 } from 'lucide-react';
import type { AiSuggestion, Severidad } from '@/types/observaciones';
import { SEVERIDAD_LABEL } from '@/types/observaciones';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/useToast';
import { aiSuggestionsService } from '@/services/aiSuggestionsService';

type Origen = 'ia' | 'editado';
type Modo = 'lectura' | 'edicion';
const MAX_RESUMEN = 280;

interface Props {
  id: string;
  sugerenciaInicial: AiSuggestion;
  origenInicial?: Origen;
  onDescartada?: (id: string) => void;
}

export function AiSuggestionCard({ id, sugerenciaInicial, origenInicial = 'ia', onDescartada }: Props) {
  const { mostrar } = useToast();
  const [guardada, setGuardada] = useState(sugerenciaInicial);
  const [origen, setOrigen] = useState<Origen>(origenInicial);
  const [modo, setModo] = useState<Modo>('lectura');
  const [borrador, setBorrador] = useState(sugerenciaInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errores, setErrores] = useState<{ resumen?: string; clasificacion?: string }>({});
  const [aprobada, setAprobada] = useState(false);
  const [confirmarDescarte, setConfirmarDescarte] = useState(false);
  const [descartando, setDescartando] = useState(false);

  const editar = () => {
    setBorrador(guardada);
    setErrores({});
    setError(null);
    setModo('edicion');
  };

  // Nielsen — control y libertad: deshacer sin tener que guardar ni recargar
  const deshacerCambios = () => {
    setBorrador(guardada);
    setErrores({});
  };

  const cancelar = () => {
    setBorrador(guardada);
    setErrores({});
    setError(null);
    setModo('lectura');
  };

  const validar = (): boolean => {
    const nuevos: typeof errores = {};
    if (!borrador.resumen.trim()) nuevos.resumen = 'El resumen no puede estar vacío.';
    else if (borrador.resumen.length > MAX_RESUMEN) nuevos.resumen = `El resumen no puede superar ${MAX_RESUMEN} caracteres.`;
    if (!borrador.clasificacion.trim()) nuevos.clasificacion = 'Selecciona o escribe una clasificación.';
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const guardar = async () => {
    if (!validar()) return;
    setGuardando(true);
    setError(null);
    try {
      await aiSuggestionsService.guardar(id, borrador);
      setGuardada(borrador);
      setOrigen('editado');
      setModo('lectura');
      mostrar('exito', 'Sugerencia guardada. Quedó marcada como editada por ti.');
    } catch {
      setError('No pudimos guardar los cambios. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  const aprobar = async () => {
    try {
      await aiSuggestionsService.aprobar(id);
      setAprobada(true);
      mostrar('exito', 'Sugerencia aprobada.');
    } catch {
      mostrar('error', 'No pudimos aprobar la sugerencia. Inténtalo de nuevo.');
    }
  };

  const confirmarDescartar = async () => {
    setDescartando(true);
    try {
      await aiSuggestionsService.descartar(id);
      mostrar('info', 'Sugerencia descartada.');
      setConfirmarDescarte(false);
      onDescartada?.(id);
    } catch {
      mostrar('error', 'No pudimos descartar la sugerencia. Inténtalo de nuevo.');
    } finally {
      setDescartando(false);
    }
  };

  const soloLectura = modo === 'lectura';
  const restantes = MAX_RESUMEN - borrador.resumen.length;

  return (
    <>
      <Card
        // POUR: el origen se comunica con borde + etiqueta + ícono + texto, nunca solo color
        className={`space-y-4 ${origen === 'ia' ? 'border-2 border-dashed border-ia-400' : 'border-2 border-solid border-slate-300'}`}
      >
        <div className="flex items-center justify-between">
          <Badge className={origen === 'ia' ? 'bg-ia-100 text-ia-900' : 'bg-slate-200 text-slate-800'}>
            {origen === 'ia' ? <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> : <Pencil className="h-3.5 w-3.5" aria-hidden="true" />}
            {origen === 'ia' ? 'Sugerido por IA' : 'Editado por ti'}
          </Badge>
          {aprobada && (
            <Badge className="bg-emerald-100 text-emerald-900">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Aprobada
            </Badge>
          )}
        </div>

        {soloLectura ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Resumen</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-800">{guardada.resumen}</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Clasificación</p>
                <p className="mt-1 text-sm font-medium">{guardada.clasificacion}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Severidad</p>
                <p className="mt-1 text-sm font-medium">{SEVERIDAD_LABEL[guardada.severidad]}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor={`resumen-${id}`} className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Resumen
              </label>
              <textarea
                id={`resumen-${id}`}
                value={borrador.resumen}
                onChange={(e) => setBorrador((b) => ({ ...b, resumen: e.target.value }))}
                rows={3}
                aria-invalid={!!errores.resumen}
                aria-describedby={`resumen-ayuda-${id}`}
                className={`w-full rounded-lg border p-3 text-sm ${errores.resumen ? 'border-red-600' : 'border-slate-300'}`}
              />
              <div id={`resumen-ayuda-${id}`} className="flex justify-between text-xs">
                <span className={errores.resumen ? 'font-medium text-red-700' : 'text-slate-500'}>{errores.resumen ?? ' '}</span>
                {/* Nielsen — prevención de errores: contador visible antes de enviar */}
                <span className={restantes < 0 ? 'font-semibold text-red-700' : 'text-slate-500'}>{restantes} caracteres restantes</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor={`clasificacion-${id}`} className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Clasificación
                </label>
                <input
                  id={`clasificacion-${id}`}
                  value={borrador.clasificacion}
                  onChange={(e) => setBorrador((b) => ({ ...b, clasificacion: e.target.value }))}
                  aria-invalid={!!errores.clasificacion}
                  className={`min-h-[44px] w-full rounded-lg border px-3 text-sm ${errores.clasificacion ? 'border-red-600' : 'border-slate-300'}`}
                />
                {errores.clasificacion && <p className="text-xs font-medium text-red-700">{errores.clasificacion}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor={`severidad-${id}`} className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Severidad
                </label>
                <select
                  id={`severidad-${id}`}
                  value={borrador.severidad}
                  onChange={(e) => setBorrador((b) => ({ ...b, severidad: Number(e.target.value) as Severidad }))}
                  className="min-h-[44px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                >
                  {([4, 3, 2, 1, 0] as Severidad[]).map((s) => (
                    <option key={s} value={s}>{SEVERIDAD_LABEL[s]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p>
        )}

        {/* Fitts: acciones principales agrupadas y separadas de Descartar (destructiva, sm) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap gap-2">
            {soloLectura ? (
              <>
                <Button variante="secondary" tamano="sm" icono={<Pencil className="h-4 w-4" aria-hidden="true" />} onClick={editar}>
                  Editar
                </Button>
                <Button tamano="sm" icono={<Check className="h-4 w-4" aria-hidden="true" />} onClick={aprobar} disabled={aprobada}>
                  {aprobada ? 'Aprobada' : 'Aprobar'}
                </Button>
              </>
            ) : (
              <>
                <Button tamano="sm" cargando={guardando} onClick={guardar}>
                  {guardando ? 'Guardando...' : 'Guardar'}
                </Button>
                <Button variante="secondary" tamano="sm" icono={<RotateCcw className="h-4 w-4" aria-hidden="true" />} onClick={deshacerCambios} disabled={guardando}>
                  Deshacer cambios
                </Button>
                <Button variante="ghost" tamano="sm" onClick={cancelar} disabled={guardando}>
                  Cancelar
                </Button>
              </>
            )}
          </div>
          <Button variante="danger" tamano="sm" icono={<Trash2 className="h-4 w-4" aria-hidden="true" />} onClick={() => setConfirmarDescarte(true)}>
            Descartar
          </Button>
        </div>
      </Card>

      <Modal
        abierto={confirmarDescarte}
        titulo="¿Descartar esta sugerencia?"
        descripcion="Esta acción no se puede deshacer. La sugerencia dejará de estar disponible."
        onCerrar={() => setConfirmarDescarte(false)}
        confirmarTexto="Sí, descartar"
        confirmarVariante="danger"
        onConfirmar={confirmarDescartar}
        cargando={descartando}
      />
    </>
  );
}