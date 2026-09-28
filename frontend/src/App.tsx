import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/AuthContext';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import LoginPage from '@/features/auth/LoginPage';
import { ToastProvider } from '@/components/ui/Toast';
import { AppLayout } from '@/app/AppLayout';
import { PaginaProximamente } from '@/components/ui/PaginaProximamente';
import DashboardPage from '@/features/dashboard/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                {/* Marcadores: se reemplazan al construir cada módulo */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/pruebas/*" element={<PaginaProximamente titulo="Pruebas" />} />
                <Route path="/observaciones/*" element={<PaginaProximamente titulo="Observaciones" />} />
                <Route path="/matrices/*" element={<PaginaProximamente titulo="Matrices heurísticas" />} />
                <Route path="/historias/*" element={<PaginaProximamente titulo="Historias de usuario" />} />
                <Route path="/configuracion" element={<PaginaProximamente titulo="Configuración" />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}