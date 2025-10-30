import { useState, useEffect } from 'react';
import type { SaludoResponse } from './types/Api'; // Importamos la interfaz
import { Button } from './components/ui/button';

function App() {
  // Usamos el tipo definido para el estado
  const [data, setData] = useState<string>(''); 

  const handleButtonClick = () => {
    alert('¡Botón presionado!');
  };

  useEffect(() => {
    // La URL `/api/saludo` es manejada por el proxy de Vite
    fetch('/api/saludo')
      .then(res => res.json())
      .then((result: SaludoResponse) => { // Tipamos el resultado de la promesa
        setData(result.message);
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
        setData('Error de conexión');
      });
  }, []);

  return (
    <div>
      <h1>Frontend React con Vite (TS)</h1>
      <p>Mensaje del servidor: <strong>{data || 'Cargando...'}</strong></p>
      {/* 1. Botón Primario (por defecto) */}
      <Button onClick={handleButtonClick}>
        Botón Primario de Shadcn
      </Button>
    </div>
  );
}

export default App;