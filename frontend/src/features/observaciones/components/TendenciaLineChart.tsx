import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Observation } from '@/types/observaciones';
import { Card } from '@/components/ui/Card';

function agruparPorFecha(observaciones: Observation[]) {
  const mapa = new Map<string, number>();
  observaciones.forEach((o) => {
    const dia = o.fecha.slice(0, 10);
    mapa.set(dia, (mapa.get(dia) ?? 0) + 1);
  });
  return [...mapa.entries()].sort(([a], [b]) => (a < b ? -1 : 1)).map(([fecha, cantidad]) => ({ fecha, cantidad }));
}

const formatoCorto = new Intl.DateTimeFormat('es-EC', { day: '2-digit', month: 'short' });

export function TendenciaLineChart({ observaciones }: { observaciones: Observation[] }) {
  const datos = agruparPorFecha(observaciones);

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Tendencia por fecha</h2>
        <p className="text-sm text-slate-600">Observaciones registradas por día, según los filtros activos</p>
      </div>

      {datos.length < 2 ? (
        <p className="py-10 text-center text-sm text-slate-600">No hay datos suficientes para mostrar una tendencia.</p>
      ) : (
        <div className="h-72 w-full" role="img" aria-label="Gráfico de línea: observaciones registradas por fecha">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={datos} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="fecha" tickFormatter={(f) => formatoCorto.format(new Date(f))} tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip labelFormatter={(f) => formatoCorto.format(new Date(f as string))} />
              <Legend />
              <Line type="monotone" dataKey="cantidad" name="Observaciones" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <table className="sr-only">
        <caption>Datos de tendencia por fecha</caption>
        <thead><tr><th scope="col">Fecha</th><th scope="col">Observaciones</th></tr></thead>
        <tbody>
          {datos.map((d) => (
            <tr key={d.fecha}><th scope="row">{formatoCorto.format(new Date(d.fecha))}</th><td>{d.cantidad}</td></tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}