/** Retardo simulado para poder mostrar estados de carga (Nielsen #1). */
export const esperar = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Entre 300 y 600 ms, como pide el prompt. */
export const retardo = () => esperar(300 + Math.random() * 300);