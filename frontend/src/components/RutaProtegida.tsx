import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RutaProtegida = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Si estamos verificando la autenticación, no renderizamos nada todavía.
  // Puedes poner aquí un componente de "Spinner" o "Cargando..." si lo prefieres.
  if (isLoading) {
    return <div>Cargando...</div>; // O simplemente null
  }

  if (!isAuthenticated && !isLoading) { // Solo redirigimos si no estamos cargando y no está autenticado
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza el componente hijo (la página protegida)
  return <Outlet />;
};
