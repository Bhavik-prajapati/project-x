const pool = require('../config/db')

async function createUser(name, email) {
  if (!name || !email) {
    throw new Error('Name and email are required')
  }

  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  )

  return result.rows[0]
}

async function getUsers() {
  const result = await pool.query('SELECT * FROM users')
  return result.rows
}

module.exports = {
  createUser,
  getUsers
}
