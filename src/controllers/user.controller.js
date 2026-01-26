const userService = require('../services/user.service')

async function createUser(req, res) {
  try {
    const { name, email } = req.body

    const user = await userService.createUser(name, email)

    res.status(201).json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

async function getUsers(req, res) {
  const users = await userService.getUsers()

  res.json({
    count: users.length,
    users
  })
}

module.exports = {
  createUser,
  getUsers
}
