type Fila = Record<string, string | number>;

/** Genera y descarga un CSV real en el cliente. */
export function exportarCsv(nombreArchivo: string, filas: Fila[]): void {
  if (filas.length === 0) return;
  const columnas = Object.keys(filas[0]);

  const escapar = (valor: string | number) => {
    let texto = String(valor);
    // Seguridad: evita que Excel ejecute textos que empiezan como fórmula
    if (/^[=+@\t\r]/.test(texto)) texto = `'${texto}`;
    return `"${texto.replace(/"/g, '""')}"`;
  };

  const lineas = [
    columnas.map(escapar).join(','),
    ...filas.map((f) => columnas.map((c) => escapar(f[c] ?? '')).join(',')),
  ];

  // \uFEFF (BOM) hace que Excel muestre bien tildes y ñ
  const blob = new Blob(['\uFEFF' + lineas.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombreArchivo.endsWith('.csv') ? nombreArchivo : `${nombreArchivo}.csv`;
  enlace.click();
  URL.revokeObjectURL(url);
}