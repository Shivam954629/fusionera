import { Pool } from "pg";

const globalForPg = globalThis as unknown as { pool: Pool };

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

if (process.env.NODE_ENV !== "production") globalForPg.pool = pool;

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitors (
      id SERIAL PRIMARY KEY,
      registration_no VARCHAR(20) UNIQUE,
      full_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      is_blocked BOOLEAN DEFAULT FALSE,
      password_hash VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await pool.query(`
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT FALSE;
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS registration_no VARCHAR(20);
  `);
}
