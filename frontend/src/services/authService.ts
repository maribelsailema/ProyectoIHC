import type { Usuario } from '@/types';

const USUARIO_MOCK: Usuario = {
  id: 'u1',
  nombre: 'Ana García',
  correo: 'demo@ihc.com',
  rol: 'Investigadora UX',
  iniciales: 'AG',
};

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const authService = {
  // TODO(backend): POST /auth/login  { correo, contrasena } -> { usuario, token }
  async iniciarSesion(correo: string, contrasena: string): Promise<Usuario> {
    await esperar(500);
    if (correo.trim().toLowerCase() !== 'demo@ihc.com' || contrasena !== 'Demo1234') {
      // Nielsen #5: mensaje específico que ayuda a recuperarse
      throw new Error('El correo o la contraseña no son correctos. Revisa los datos e inténtalo de nuevo.');
    }
    return USUARIO_MOCK;
  },

  // TODO(backend): POST /auth/logout
  async cerrarSesion(): Promise<void> {
    await esperar(200);
  },
};