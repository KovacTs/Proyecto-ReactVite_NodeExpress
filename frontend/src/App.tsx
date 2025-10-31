import { useState, useEffect } from 'react';
import { Button } from './components/components/ui/button';

import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from './components/mode-toggle';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';


function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Mi Aplicación</h1>
          </div>

          {showLogin ? (
            <>
              <h2 className="text-center text-xl font-semibold">Iniciar Sesión</h2>
              <LoginForm />
              <p className="mt-4 text-center">
                ¿No tienes cuenta? <Button variant="link" onClick={() => setShowLogin(false)}>Regístrate</Button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-center text-xl font-semibold">Registro</h2>
              <RegisterForm />
              <p className="mt-4 text-center">
                ¿Ya tienes cuenta? <Button variant="link" onClick={() => setShowLogin(true)}>Inicia Sesión</Button>
              </p>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;