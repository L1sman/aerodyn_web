import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authStore } from '@/entities/auth/model/store';

const LoginPage = lazy(() => import('@/pages/auth/ui/LoginPage').then(m => ({ default: m.LoginPage })));
const DeliveryDashboard = lazy(() => import('@/pages/dashboard/ui/DeliveryDashboard').then(m => ({ default: m.DeliveryDashboard })));

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return authStore.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DeliveryDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}; 