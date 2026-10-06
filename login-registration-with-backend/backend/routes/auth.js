const express = require('express')
const bcrypt  = require('bcryptjs')
const User    = require('../models/User')

const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password, phone, course } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required.' })
  }

  try {
    const exists = await User.findOne({ $or: [{ email }, { username }] })
    if (exists) {
      return res.status(409).json({ message: 'Username or email already registered.' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user   = await User.create({ username, email, password: hashed, phone, course })

    res.status(201).json({ message: 'Registration successful!', userId: user._id })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' })
  }

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    res.json({ message: `Welcome back, ${user.username}!` })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

module.exports = router
