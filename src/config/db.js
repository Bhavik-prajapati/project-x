const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

async function initDb(retries = 5, delay = 3000) {
  while (retries) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL
        )
      `)
      console.log('✅ Database ready & users table ensured')
      return
    } catch (err) {
      console.log(`⏳ DB not ready yet, retrying... (${retries})`)
      retries--
      await new Promise(res => setTimeout(res, delay))
    }
  }
  throw new Error('❌ Could not connect to DB after retries')
}

initDb()

module.exports = pool
