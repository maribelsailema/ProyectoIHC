import type { HeuristicaId, Observation, Severidad } from '@/types/observaciones';

export const pruebasMock = [
  { id: 'TST-101', nombre: 'E-commerce Redesign — Checkout' },
  { id: 'TST-102', nombre: 'E-commerce Redesign — Catálogo' },
  { id: 'TST-103', nombre: 'Mobile App Onboarding — Registro' },
  { id: 'TST-104', nombre: 'Mobile App Onboarding — Tutorial' },
  { id: 'TST-105', nombre: 'Checkout Optimization — Pago' },
  { id: 'TST-106', nombre: 'Checkout Optimization — Envío' },
];

const descripciones = [
  "El botón 'Finalizar compra' queda oculto detrás del teclado virtual en pantallas pequeñas.",
  'El usuario no encontró el enlace para recuperar la contraseña en la pantalla de inicio de sesión.',
  'Los mensajes de error del formulario de pago no indican qué campo específico falló.',
  'El participante tardó más de 40 segundos en localizar el filtro de categorías.',
  'El ícono del carrito no tiene una etiqueta visible, solo un número, lo que generó confusión.',
  'Al eliminar un producto del carrito no aparece ninguna confirmación ni opción de deshacer.',
  'El texto de los términos y condiciones tiene un contraste insuficiente sobre el fondo gris.',
  'La barra de progreso del registro no indica en qué paso se encuentra el usuario.',
  "El botón 'Continuar' permanece habilitado aunque el campo de correo esté vacío.",
  'El tutorial de onboarding no se puede saltar, lo que frustró a varios participantes recurrentes.',
  'Los campos de dirección no muestran una etiqueta persistente, solo un placeholder que desaparece al escribir.',
  'El participante confundió el ícono de notificaciones con el de configuración por su similitud visual.',
  'No hay manera de volver atrás desde la pantalla de confirmación de pago sin perder los datos ingresados.',
  'El tamaño de los botones de talla de producto es menor a 44px, dificultando el toque en móvil.',
  'El mensaje de éxito al guardar la dirección desaparece demasiado rápido para leerlo completo.',
  "La navegación por teclado se salta el botón de 'Aplicar cupón' en el checkout.",
  'El buscador no sugiere resultados ni corrige errores de escritura comunes.',
  'El participante no identificó el ícono de envío gratis sin pasar el cursor sobre él.',
  'La pantalla de carga no comunica cuánto tiempo falta para completar el proceso de pago.',
  'El formulario de registro solicita la misma información dos veces en pasos distintos.',
];

const heuristicas: HeuristicaId[] = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10', 'P', 'O', 'U', 'R'];
const severidades: Severidad[] = [4, 3, 2, 1, 0];
const horas = ['08:15:00', '10:30:00', '14:45:00', '16:20:00'];

function fechaHace(diasAtras: number, hora: string): string {
  const d = new Date();
  d.setDate(d.getDate() - diasAtras);
  return `${d.toISOString().slice(0, 10)}T${hora}`;
}

// 40 observaciones: cada descripción se repite 2 veces con prueba, fecha, severidad y heurística distintas
export const observacionesMock: Observation[] = descripciones.flatMap((descripcion, i) =>
  [0, 1].map((variante) => {
    const indice = i * 2 + variante;
    return {
      id: `OBS-${1200 + indice}`,
      testId: pruebasMock[indice % pruebasMock.length].id,
      descripcion,
      severidad: severidades[indice % severidades.length],
      heuristica: heuristicas[indice % heuristicas.length],
      fecha: fechaHace((indice * 3) % 35, horas[indice % horas.length]),
    };
  }),
);