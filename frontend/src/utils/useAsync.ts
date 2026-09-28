import { useCallback, useEffect, useRef, useState } from 'react';

interface Estado<T> {
  data: T | null;
  cargando: boolean;
  error: string | null;
}

/** `fn` debe ser estable (envuélvela en useCallback). Ejecuta al montar y expone `recargar`. */
export function useAsync<T>(fn: () => Promise<T>) {
  const [estado, setEstado] = useState<Estado<T>>({ data: null, cargando: true, error: null });
  const ultimo = useRef(0);

  const ejecutar = useCallback(() => {
    const id = ++ultimo.current;
    setEstado((s) => ({ ...s, cargando: true, error: null }));
    fn()
      .then((data) => {
        // Ignora respuestas viejas si el usuario cambió el filtro mientras cargaba
        if (id === ultimo.current) setEstado({ data, cargando: false, error: null });
      })
      .catch((e: unknown) => {
        if (id === ultimo.current) {
          setEstado({
            data: null,
            cargando: false,
            error: e instanceof Error ? e.message : 'No pudimos cargar la información. Inténtalo de nuevo.',
          });
        }
      });
  }, [fn]);

  useEffect(() => {
    ejecutar();
  }, [ejecutar]);

  return { ...estado, recargar: ejecutar };
}