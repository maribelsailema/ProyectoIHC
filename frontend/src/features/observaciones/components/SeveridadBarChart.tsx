import { Bar, BarChart, CartesianGrid, Legend, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Observation, Severidad } from '@/types/observaciones';
import { SEVERIDAD_LABEL } from '@/types/observaciones';
import { Card } from '@/components/ui/Card';

const orden: Severidad[] = [4, 3, 2, 1, 0];

export function SeveridadBarChart({ observaciones }: { observaciones: Observation[] }) {
  const datos = orden.map((s) => ({
    severidad: SEVERIDAD_LABEL[s],
    cantidad: observaciones.filter((o) => o.severidad === s).length,
  }));

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Distribución por severidad</h2>
        <p className="text-sm text-slate-600">Cantidad de observaciones en el resultado filtrado</p>
      </div>

      {observaciones.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-600">No hay datos para mostrar con los filtros actuales.</p>
      ) : (
        <div className="h-72 w-full" role="img" aria-label="Gráfico de barras: cantidad de observaciones por nivel de severidad">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datos} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              {/* POUR: ejes con texto, no solo color */}
              <XAxis dataKey="severidad" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" name="Observaciones" fill="#4f46e5" radius={[6, 6, 0, 0]}>
                {/* Etiqueta de valor visible sobre cada barra: no depende solo del color */}
                <LabelList dataKey="cantidad" position="top" style={{ fontSize: 12, fill: '#1e293b' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Alternativa textual para lectores de pantalla (POUR Perceptible/Robusto) */}
      <table className="sr-only">
        <caption>Datos de distribución por severidad</caption>
        <thead>
          <tr><th scope="col">Severidad</th><th scope="col">Cantidad</th></tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr key={d.severidad}><th scope="row">{d.severidad}</th><td>{d.cantidad}</td></tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}