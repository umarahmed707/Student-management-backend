

import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

dotenv.config();

const pool = new Pool({
      user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;