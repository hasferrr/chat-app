/* eslint-disable no-underscore-dangle */
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authenticationRouter = require('express').Router()

const User = require('../models/user')

authenticationRouter.post('/register', async (request, response) => {
  const { username, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

authenticationRouter.post('/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    response.status(401).json({
      error: 'invalid username or password',
    })
    return
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.SECRET,
  )

  response.status(200).send({ token, username: user.username })
})

module.exports = authenticationRouter
