import type { PuntoTendencia } from '@/types';
import { Card } from '@/components/ui/Card';

type Clave = 'observaciones' | 'pruebas';

// POUR Perceptible: las series se distinguen por color + forma del marcador + trazo
// (continuo vs. punteado), no solo por color.
const series: { clave: Clave; nombre: string; color: string; marcador: 'circulo' | 'cuadrado'; trazo?: string }[] = [
  { clave: 'observaciones', nombre: 'Observaciones', color: 'text-brand-600', marcador: 'circulo' },
  { clave: 'pruebas', nombre: 'Pruebas', color: 'text-teal-600', marcador: 'cuadrado', trazo: '6 4' },
];

const W = 640;
const H = 260;
const M = { t: 16, r: 16, b: 32, l: 44 };

function Marcador({ tipo, cx, cy }: { tipo: 'circulo' | 'cuadrado'; cx: number; cy: number }) {
  const comun = { fill: 'white', stroke: 'currentColor', strokeWidth: 2 };
  return tipo === 'circulo' ? (
    <circle cx={cx} cy={cy} r={4.5} {...comun} />
  ) : (
    <rect x={cx - 4} y={cy - 4} width={8} height={8} {...comun} />
  );
}

export function TendenciaChart({ datos }: { datos: PuntoTendencia[] }) {
  const n = datos.length;
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Tendencia de Análisis</h2>
          <p className="text-sm text-slate-600">Observaciones y pruebas por día</p>
        </div>
        {/* Leyenda con la misma forma de marcador que el gráfico */}
        <ul className="flex gap-4 text-sm">
          {series.map((s) => (
            <li key={s.clave} className="flex items-center gap-2">
              <svg width="26" height="12" aria-hidden="true" className={s.color}>
                <line x1="0" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="2.5" strokeDasharray={s.trazo} />
                <Marcador tipo={s.marcador} cx={13} cy={6} />
              </svg>
              {s.nombre}
            </li>
          ))}
        </ul>
      </div>

      {n < 2 ? (
        <p className="py-10 text-center text-sm text-slate-600">No hay datos suficientes para mostrar la tendencia.</p>
      ) : (
        <Grafico datos={datos} />
      )}
    </Card>
  );
}

function Grafico({ datos }: { datos: PuntoTendencia[] }) {
  const n = datos.length;
  const iw = W - M.l - M.r;
  const ih = H - M.t - M.b;
  const maximo = Math.max(40, Math.ceil(Math.max(...datos.flatMap((d) => [d.observaciones, d.pruebas])) / 40) * 40);
  const x = (i: number) => M.l + (i * iw) / (n - 1);
  const y = (v: number) => M.t + ih - (v / maximo) * ih;
  const marcas = [0, 1, 2, 3, 4].map((i) => (maximo / 4) * i);

  const linea = (k: Clave) => datos.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d[k])}`).join(' ');
  const area = (k: Clave) => `${linea(k)} L${x(n - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  return (
    <>
      {/* En pantallas angostas el gráfico se desplaza dentro de su contenedor */}
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[520px]" role="img" aria-labelledby="titulo-grafico">
          <title id="titulo-grafico">
            Gráfico de líneas: observaciones y pruebas por día, de {datos[0].dia} a {datos[n - 1].dia}. Los valores exactos están en la tabla siguiente.
          </title>

          {marcas.map((v) => (
            <g key={v}>
              <line x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} className="stroke-slate-200" />
              <text x={M.l - 8} y={y(v) + 4} textAnchor="end" className="fill-slate-600 text-[11px]">
                {v}
              </text>
            </g>
          ))}

          {datos.map((d, i) => (
            <text key={d.dia} x={x(i)} y={H - 10} textAnchor="middle" className="fill-slate-600 text-[12px]">
              {d.dia}
            </text>
          ))}

          {series.map((s) => (
            // currentColor permite usar una sola clase de color para línea, área y marcadores
            <g key={s.clave} className={s.color}>
              <defs>
                <linearGradient id={`grad-${s.clave}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area(s.clave)} fill={`url(#grad-${s.clave})`} />
              <path d={linea(s.clave)} fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={s.trazo} strokeLinejoin="round" />
              {datos.map((d, i) => (
                <Marcador key={d.dia} tipo={s.marcador} cx={x(i)} cy={y(d[s.clave])} />
              ))}
            </g>
          ))}
        </svg>
      </div>

      {/* Alternativa textual para lectores de pantalla (POUR Perceptible/Robusto) */}
      <table className="sr-only">
        <caption>Datos de la tendencia de análisis</caption>
        <thead>
          <tr>
            <th scope="col">Día</th>
            <th scope="col">Observaciones</th>
            <th scope="col">Pruebas</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr key={d.dia}>
              <th scope="row">{d.dia}</th>
              <td>{d.observaciones}</td>
              <td>{d.pruebas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}