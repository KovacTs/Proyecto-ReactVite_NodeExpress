// server.ts
import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import { userRepository } from './repositories/user.repository.js';
import bcrypt from 'bcrypt'

// Definimos el puerto del servidor. Usamos 'const' o 'readonly' en TS.
const PORT = 3000; 

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || 'user_db',
    password: process.env.PGPASSWORD || 'password_db',
    database: process.env.PGDATABASE || 'auth_db',
});

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

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Extender la interfaz Request para incluir la información del usuario del token
interface AuthenticatedRequest extends Request {
    user?: { userId: number; email: string; iat: number; exp: number };
}


// Definimos un tipo para la estructura de la respuesta para el endpoint
interface SaludoResponse {
    message: string;
}
interface RespuestaBoton {
    message: string;
}


// Endpoint de prueba
// Importamos Request y Response de 'express' para tipar los parámetros req y res
app.get('/api/saludo', (req: Request, res: Response<SaludoResponse>) => {
    // Usamos res.json() y TypeScript sabrá que debe coincidir con SaludoResponse
    res.json({ message: 'Hola desde el backend de Express con TypeScript!' });
});

app.get('/api/RespuestaBoton', (req: Request, res: Response<RespuestaBoton>) => {
    res.json({ message: 'Este es el endpoint del botón!' });
});

// Endpoint para registrar un nuevo usuario
app.post('/api/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const newUser = await userRepository.create(name, email, password);
        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error al registrar el usuario. El email ya podría estar en uso.' });
    }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
    }

    try {
        const user = await userRepository.findByEmail(email);

        const validPassword = user && await bcrypt.compare(password, user.password);

        if (!user || !validPassword) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Crear el token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret', // Usamos la variable de entorno
            { expiresIn: '1h' } // El token expirará en 1 hora
        );

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor al intentar iniciar sesión.' });
    }
});

// Middleware de autenticación para proteger rutas
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    // El token viene en el formato "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // No hay token, no autorizado
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err: any, user: any) => {
        if (err) {
            // Token inválido o expirado
            return res.sendStatus(403);
        }
        // El payload del token se añade a la request
        req.user = user;
        next(); // Pasa al siguiente middleware o al manejador de la ruta
    });
};

// Endpoint protegido de ejemplo: Obtener perfil del usuario
app.get('/api/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    // Gracias al middleware, ahora tenemos acceso a req.user
    const userId = req.user?.userId;
    const userProfile = await userRepository.findById(userId!);
    res.json(userProfile);
});

// Iniciamos el servidor
app.listen(PORT, async () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});