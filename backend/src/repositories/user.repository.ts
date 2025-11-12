import { Pool } from 'pg';
import bcrypt from 'bcrypt';

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || 'user_db',
    password: process.env.PGPASSWORD || 'password_db',
    database: process.env.PGDATABASE || 'auth_db',
});

export const userRepository = {
  async findByEmail(email: string) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  },

  async create(name: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING id, email',
      [name, email, hashedPassword]
    );
    return result.rows[0];
  },

  async findById(id: number) {
    const { rows } = await pool.query('SELECT id, name, email FROM usuarios WHERE id = $1', [id]);
    return rows[0];
  }
};
