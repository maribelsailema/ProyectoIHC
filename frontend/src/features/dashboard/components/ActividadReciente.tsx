import { Download } from 'lucide-react';
import type { Actividad } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Tabla, Td, Th } from '@/components/ui/Table';
import { formatearFecha } from '@/utils/formatearFecha';

interface Props {
  filas: Actividad[];
  hayMas: boolean;
  cargandoMas: boolean;
  onCargarMas: () => void;
  onExportar: () => void;
}

export function ActividadReciente({ filas, hayMas, cargandoMas, onCargarMas, onExportar }: Props) {
  return (
    <Card className="space-y-4 p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
        <h2 className="text-lg font-bold">Actividad Reciente</h2>
        {/* Fitts: acción secundaria más pequeña (sm) que las principales */}
        <Button variante="secondary" tamano="sm" icono={<Download className="h-4 w-4" aria-hidden="true" />} onClick={onExportar} disabled={filas.length === 0}>
          Exportar CSV
        </Button>
      </div>

      {filas.length === 0 ? (
        <p className="px-6 pb-8 text-center text-sm text-slate-600">
          Todavía no hay actividad en este período. Cuando registres pruebas u observaciones aparecerán aquí.
        </p>
      ) : (
        <Tabla caption="Actividad reciente de la plataforma">
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Proyecto</Th>
              <Th>Tipo</Th>
              <Th>Estado</Th>
              <Th>Usuario</Th>
              <Th>Fecha</Th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50">
                <Td className="font-mono text-xs font-medium">{f.id}</Td>
                <Td>{f.proyecto}</Td>
                <Td>{f.tipo}</Td>
                <Td>
                  <StatusBadge estado={f.estado} />
                </Td>
                <Td>{f.usuario}</Td>
                <Td className="whitespace-nowrap text-slate-600">{formatearFecha(f.fecha)}</Td>
              </tr>
            ))}
          </tbody>
        </Tabla>
      )}

      <div className="flex justify-center px-6 pb-6">
        <Button variante="secondary" cargando={cargandoMas} disabled={!hayMas} onClick={onCargarMas}>
          {hayMas ? (cargandoMas ? 'Cargando...' : 'Cargar más actividad') : 'No hay más actividad'}
        </Button>
      </div>
    </Card>
  );
}