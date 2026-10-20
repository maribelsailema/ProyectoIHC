import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/AuthContext';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import LoginPage from '@/features/auth/LoginPage';
import { ToastProvider } from '@/components/ui/Toast';
import { AppLayout } from '@/app/AppLayout';
import { PaginaProximamente } from '@/components/ui/PaginaProximamente';
import DashboardPage from '@/features/dashboard/DashboardPage';
import MetricasPage from '@/features/observaciones/MetricasPage';
import AiSuggestionsDemoPage from '@/features/historias/AiSuggestionsDemoPage';

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
                <Route path="/observaciones/metricas" element={<MetricasPage />} />
                <Route
                  path="/observaciones/*"
                  element={
                    <PaginaProximamente
                      titulo="Observaciones"
                      accion={{ href: '/observaciones/metricas', texto: 'Ver panel de métricas y tendencias (HU-4.1 / HU-4.2)' }}
                    />
                  }
                />

                <Route path="/historias/demo-ia" element={<AiSuggestionsDemoPage />} />
                <Route
                  path="/historias/*"
                  element={
                    <PaginaProximamente
                      titulo="Historias de usuario"
                      accion={{ href: '/historias/demo-ia', texto: 'Ver demo: Sugerencias de IA (HU-5.4)' }}
                    />
                  }
                />
                <Route path="/matrices/*" element={<PaginaProximamente titulo="Matrices heurísticas" />} />
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