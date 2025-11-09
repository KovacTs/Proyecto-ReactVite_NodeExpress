
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button";

export function Home() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido a Mi Aplicación
      </h1>
      <p className="text-lg mb-6">
        Esta es la página principal. Por favor, inicia sesión o regístrate para continuar.
      </p>
      <div className="flex justify-center space-x-4">
        <Link to="/login">
          <Button>Iniciar Sesión</Button>
        </Link>
        <Link to="/register">
          <Button>Regístrate</Button>
        </Link>
      </div>
    </div>
  );
}