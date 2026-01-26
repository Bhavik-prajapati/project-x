const express = require('express')
const router = express.Router()

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Project X is running' })
})

module.exports = router
