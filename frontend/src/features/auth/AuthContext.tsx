import { createContext, useState, type ReactNode } from 'react';
import type { Usuario } from '@/types';
import { authService } from '@/services/authService';

interface AuthValue {
  usuario: Usuario | null;
  iniciarSesion: (correo: string, contrasena: string) => Promise<void>;
  cerrarSesion: () => Promise<void>;
}

export const AuthContext = createContext<AuthValue | null>(null);

const CLAVE = 'ihc_usuario';

export function AuthProvider({ children }: { children: ReactNode }) {
  // DECISIÓN: sessionStorage solo para no perder la sesión al recargar en desarrollo.
  // Con backend real se reemplaza por token/cookie.
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const guardado = sessionStorage.getItem(CLAVE);
    return guardado ? (JSON.parse(guardado) as Usuario) : null;
  });

  const iniciarSesion = async (correo: string, contrasena: string) => {
    const u = await authService.iniciarSesion(correo, contrasena);
    sessionStorage.setItem(CLAVE, JSON.stringify(u));
    setUsuario(u);
  };

  const cerrarSesion = async () => {
    await authService.cerrarSesion();
    sessionStorage.removeItem(CLAVE);
    setUsuario(null);
  };

  return <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>{children}</AuthContext.Provider>;
}