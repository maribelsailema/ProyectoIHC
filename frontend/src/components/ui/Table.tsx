import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react';

// HTML semántico (POUR Robusto): table, caption, th con scope.
// overflow-x-auto: en móvil la tabla se desplaza dentro de su contenedor, no la página.
export function Tabla({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function Th({ className = '', ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope="col"
      className={`border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 ${className}`}
      {...rest}
    />
  );
}

export function Td({ className = '', ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`border-b border-slate-100 px-4 py-3.5 text-slate-800 ${className}`} {...rest} />;
}