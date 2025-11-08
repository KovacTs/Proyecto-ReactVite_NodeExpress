import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Button } from './components/ui/button';
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from './components/mode-toggle';
import { LoginForm } from './pages/auth/LoginForm';
import { RegisterForm } from './pages/auth/RegisterForm';

import { Link } from 'react-router-dom';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Mi Aplicación</h1>
          </div>

          <Routes>
              {/* Ruta para Iniciar Sesión. URL: /login */}
              <Route 
                path="/login" 
                element={
                  <>
                    <h2 className="text-center text-xl font-semibold">Iniciar Sesión</h2>
                    <LoginForm />
                    <p className="mt-4 text-center">
                      ¿No tienes cuenta? 
                      {/* Usamos <Link> para navegar sin recargar la página */}
                      <Link to="/register"><Button variant="link">Regístrate</Button></Link>
                    </p>
                  </>
                } 
              />
              
              {/* Ruta para Registro. URL: /register */}
              <Route 
                path="/register" 
                element={
                  <>
                    <h2 className="text-center text-xl font-semibold">Registro</h2>
                    <RegisterForm />
                    <p className="mt-4 text-center">
                      ¿Ya tienes cuenta? 
                      {/* Usamos <Link> para navegar sin recargar la página */}
                      <Link to="/login"><Button variant="link">Inicia Sesión</Button></Link>
                    </p>
                  </>
                } 
              />
              
              {/* Opcional: Establece una ruta por defecto (ej. al /login) o para una Home Page */}
              <Route path="/" element={<div>Bienvenido a la Home Page. <Link to="/login">Ir a Login</Link></div>} />

              {/* Opcional: Ruta para manejar URLs no encontradas (404) */}
              <Route path="*" element={<div>Error 404: Página no encontrada</div>} />
              
            </Routes>
        </div>
      </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;