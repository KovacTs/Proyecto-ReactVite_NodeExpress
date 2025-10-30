// server.ts
import express, { type Request,type Response } from 'express';
import cors from 'cors';

// Definimos el puerto del servidor. Usamos 'const' o 'readonly' en TS.
const PORT = 3000; 

// Inicializamos la aplicación de Express
const app = express();

// Configurar CORS
const corsOptions = {
    // Especificamos explícitamente el origen permitido para el frontend de Vite.
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Opcional, pero buena práctica
    allowedHeaders: ['Content-Type', 'Authorization'], // Opcional
};
app.use(cors(corsOptions));

// Definimos un tipo para la estructura de la respuesta para el endpoint
interface SaludoResponse {
    message: string;
}

// Endpoint de prueba
// Importamos Request y Response de 'express' para tipar los parámetros req y res
app.get('/api/saludo', (req: Request, res: Response<SaludoResponse>) => {
    // Usamos res.json() y TypeScript sabrá que debe coincidir con SaludoResponse
    res.json({ message: 'Hola desde el backend de Express con TypeScript!' });
});


// Iniciamos el servidor
app.listen(PORT, () => {
    // Usamos template literals para el mensaje de consola
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});