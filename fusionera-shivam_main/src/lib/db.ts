import { Pool } from "pg";

const globalForPg = globalThis as unknown as { pool: Pool };

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Always on — required for Supabase/Neon
  });

if (process.env.NODE_ENV !== "production") globalForPg.pool = pool;

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitors (
      id SERIAL PRIMARY KEY,
      registration_no VARCHAR(20) UNIQUE,
      -- Basic Details
      photo_url TEXT,
      invited_by VARCHAR(100),
      title VARCHAR(20),
      first_name VARCHAR(100),
      middle_name VARCHAR(100),
      last_name VARCHAR(100),
      designation VARCHAR(100),
      company VARCHAR(255),
      country_code VARCHAR(10) DEFAULT '91',
      phone_number VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      country VARCHAR(100) DEFAULT 'India',
      business_card_front TEXT,
      business_card_back TEXT,
      -- Address Details
      address1 VARCHAR(255),
      address2 VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      pincode VARCHAR(20),
      -- Business Profile
      business_type VARCHAR(100),
      nature_of_business VARCHAR(100),
      annual_turnover VARCHAR(100),
      -- Product Interests (array stored as text)
      product_interests TEXT,
      -- Visit Purpose
      visit_purpose TEXT,
      -- Annual Buying
      annual_buying VARCHAR(100),
      -- Additional Info
      how_did_you_hear VARCHAR(100),
      additional_notes TEXT,
      -- Brands & Products
      brands_interested TEXT,
      -- Status
      visitor_type VARCHAR(20) DEFAULT 'indian',
      is_blocked BOOLEAN DEFAULT FALSE,
      password_hash VARCHAR(255),
      qr_code TEXT,
      registration_complete BOOLEAN DEFAULT FALSE,
      otp_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS otps (
      id SERIAL PRIMARY KEY,
      phone_number VARCHAR(50) NOT NULL,
      otp VARCHAR(10) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Add columns if not exist
  await pool.query(`
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS registration_no VARCHAR(20);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT FALSE;
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS qr_code TEXT;
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS registration_complete BOOLEAN DEFAULT FALSE;
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS otp_verified BOOLEAN DEFAULT FALSE;
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS visitor_type VARCHAR(20) DEFAULT 'indian';
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS photo_url TEXT;
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS first_name VARCHAR(100);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS title VARCHAR(20);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS company VARCHAR(255);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS designation VARCHAR(100);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS country VARCHAR(100);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS product_interests TEXT;
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS visit_purpose TEXT;
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS annual_buying VARCHAR(100);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS business_type VARCHAR(100);
    ALTER TABLE visitors ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);
  `);
}
