import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle, BarChart3 } from 'lucide-react';
import { useAuth } from './useAuth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';

export default function LoginPage() {
  const { usuario, iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState<{ correo?: string; contrasena?: string }>({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);

  if (usuario) return <Navigate to="/dashboard" replace />;

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    // Nielsen #2: prevención de errores, validamos antes de enviar
    const nuevos: typeof errores = {};
    if (!correo.trim()) nuevos.correo = 'Escribe tu correo electrónico.';
    else if (!/^\S+@\S+\.\S+$/.test(correo)) nuevos.correo = 'El correo debe tener un formato como nombre@dominio.com.';
    if (!contrasena) nuevos.contrasena = 'Escribe tu contraseña.';
    setErrores(nuevos);
    setErrorGeneral('');
    if (Object.keys(nuevos).length) return;

    setCargando(true);
    try {
      await iniciarSesion(correo, contrasena);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrorGeneral(err instanceof Error ? err.message : 'No pudimos iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-slate-50 to-ia-50 p-4">
      <Card className="w-full max-w-md space-y-6 p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-600 text-white">
            <BarChart3 className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider">Dashboard</p>
            <p className="text-xs uppercase tracking-wider text-slate-600">Usabilidad</p>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-slate-600">Ingresa con tu cuenta para continuar.</p>
        </div>

        {errorGeneral && (
          <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errorGeneral}
          </div>
        )}

        <form onSubmit={enviar} noValidate className="space-y-4">
          <FormField
            id="correo"
            etiqueta="Correo electrónico"
            type="email"
            autoComplete="email"
            placeholder="demo@ihc.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            error={errores.correo}
          />
          <FormField
            id="contrasena"
            etiqueta="Contraseña"
            type="password"
            autoComplete="current-password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            error={errores.contrasena}
          />
          {/* Fitts: botón principal ancho completo, al pie del formulario */}
          <Button type="submit" className="w-full" cargando={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>

        <p className="rounded-lg bg-slate-100 p-3 text-xs text-slate-700">
          <span className="font-semibold">Usuario de prueba:</span>{' '}
          <span className="font-mono">demo@ihc.com</span> / <span className="font-mono">Demo1234</span>
        </p>
      </Card>
    </main>
  );
}