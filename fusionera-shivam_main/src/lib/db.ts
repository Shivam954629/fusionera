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
      full_name VARCHAR(255) NOT NULL,
      company_name VARCHAR(255),
      phone_number VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      city VARCHAR(100),
      business_type VARCHAR(100),
      is_blocked BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Add is_blocked column if it doesn't exist (for existing tables)
  await pool.query(`
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT FALSE;
  `);
}
