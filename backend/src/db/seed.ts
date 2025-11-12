import { Pool } from 'pg';
import bcrypt from 'bcrypt';

// Conexión directa a la DB
const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || 'user_db',
    password: process.env.PGPASSWORD || 'password_db',
    database: process.env.PGDATABASE || 'auth_db',
});

async function seed() {
  console.log('Iniciando el seeding...');
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Insertar un usuario de prueba
    await pool.query(
      `INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING;`, // No hacer nada si el email ya existe
      ['Admin User', 'admin@example.com', hashedPassword]
    );

    console.log('¡Seeding completado con éxito!');
  } catch (error) {
    console.error('Error durante el seeding:', error);
  } finally {
    await pool.end();
  }
}

seed();
