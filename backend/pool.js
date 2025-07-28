import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'tofu',
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
});

pool.connect()
  .then((client) => {
    console.log('✅ Connected to PostgreSQL');
    client.release(); 
  })
  .catch((err) => {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
  });

export default pool;