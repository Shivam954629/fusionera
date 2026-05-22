import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  pool?: Pool;
  poolConnectionString?: string;
};

const connectionString = process.env.DATABASE_URL;
const isLocalConnection =
  !connectionString ||
  connectionString.includes("localhost") ||
  connectionString.includes("127.0.0.1") ||
  connectionString.includes("[::1]");

if (globalForPg.pool && globalForPg.poolConnectionString !== connectionString) {
  void globalForPg.pool.end().catch(() => {});
  globalForPg.pool = undefined;
}

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString,
    ssl: isLocalConnection
      ? undefined
      : { rejectUnauthorized: false, checkServerIdentity: () => undefined },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
  globalForPg.poolConnectionString = connectionString;
}

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitors (
      id SERIAL PRIMARY KEY,
      registration_no VARCHAR(20) UNIQUE,
      full_name VARCHAR(255) NOT NULL,
      company_name VARCHAR(255),
      phone_number VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      city VARCHAR(100),
      business_type VARCHAR(100),
      is_blocked BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Gate entry tracking — one row per entry per day per visitor
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitor_entries (
      id SERIAL PRIMARY KEY,
      visitor_id INTEGER,
      reg_no VARCHAR(50),
      entered_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // Expand phone_number column if it was created with VARCHAR(20)
  await pool.query(`ALTER TABLE visitors ALTER COLUMN phone_number TYPE VARCHAR(255);`).catch(() => {});
  // Expand otps phone_number too (used as email key for international visitors)
  await pool.query(`ALTER TABLE otps ALTER COLUMN phone_number TYPE VARCHAR(255);`).catch(() => {});

  // Ensure all columns required by registration flow exist (safe to run repeatedly)
  const visitorCols: string[] = [
    `ADD COLUMN IF NOT EXISTS otp_verified BOOLEAN DEFAULT FALSE`,
    `ADD COLUMN IF NOT EXISTS registration_complete BOOLEAN DEFAULT FALSE`,
    `ADD COLUMN IF NOT EXISTS qr_code TEXT`,
    `ADD COLUMN IF NOT EXISTS password_hash TEXT`,
    `ADD COLUMN IF NOT EXISTS first_name VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS middle_name VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS last_name VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS title VARCHAR(20)`,
    `ADD COLUMN IF NOT EXISTS designation VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS company VARCHAR(255)`,
    `ADD COLUMN IF NOT EXISTS email2 VARCHAR(255)`,
    `ADD COLUMN IF NOT EXISTS phone2 VARCHAR(50)`,
    `ADD COLUMN IF NOT EXISTS address1 TEXT`,
    `ADD COLUMN IF NOT EXISTS address2 TEXT`,
    `ADD COLUMN IF NOT EXISTS state VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS pincode VARCHAR(10)`,
    `ADD COLUMN IF NOT EXISTS nature_of_business TEXT`,
    `ADD COLUMN IF NOT EXISTS annual_turnover VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS product_interests TEXT`,
    `ADD COLUMN IF NOT EXISTS visit_purpose TEXT`,
    `ADD COLUMN IF NOT EXISTS annual_buying VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS how_did_you_hear VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS additional_notes TEXT`,
    `ADD COLUMN IF NOT EXISTS brands_interested TEXT`,
    `ADD COLUMN IF NOT EXISTS photo_url TEXT`,
    `ADD COLUMN IF NOT EXISTS invited_by VARCHAR(100)`,
    `ADD COLUMN IF NOT EXISTS business_card_front TEXT`,
    `ADD COLUMN IF NOT EXISTS business_card_back TEXT`,
    `ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'India'`,
  ];
  for (const col of visitorCols) {
    await pool.query(`ALTER TABLE visitors ${col}`).catch(() => {});
  }

  // Site settings table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key VARCHAR(100) PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Seed default contact details if not present
  const defaults: [string, string][] = [
    ["contact_delhi_name", "Mr. Pawan Singh"],
    ["contact_delhi_mobile", "+91 93157 00590"],
    ["contact_delhi_tel", "+91 (11) 2571 4111"],
    ["contact_delhi_email", "pawan.singh@fusiontheera.com"],
    ["contact_mumbai_name", "Mr. Jasvinder Singh Chaudhary"],
    ["contact_mumbai_mobile", "+91 85888 92885"],
    ["contact_mumbai_tel", "+91 (22) 6997 1122"],
    ["contact_mumbai_email", "jasvinder.chaudhary@fusiontheera.com"],
    ["logo_url", "/images/logo.jpeg"],
    ["event_date", "July 4–7, 2026"],
    ["event_venue", "Bharat Mandapam, Pragati Maidan, New Delhi"],
  ];
  for (const [k, v] of defaults) {
    await pool.query(
      `INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING`,
      [k, v],
    );
  }
}
