import { Pool } from "pg";

const globalForPg = globalThis as unknown as { pool: Pool };

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false, checkServerIdentity: () => undefined },
  });

if (process.env.NODE_ENV !== "production") globalForPg.pool = pool;

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitors (
      id SERIAL PRIMARY KEY,
      registration_no VARCHAR(20) UNIQUE,
      full_name VARCHAR(255) NOT NULL,
      company_name VARCHAR(255),
      phone_number VARCHAR(20) NOT NULL,
      email VARCHAR(255),
      city VARCHAR(100),
      business_type VARCHAR(100),
      is_blocked BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}
