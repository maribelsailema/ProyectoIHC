import type { ReactNode } from 'react';

// Base de todas las píldoras (estado, severidad, variación). Nielsen #4: consistencia
export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}