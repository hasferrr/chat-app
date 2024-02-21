require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { createServer } = require('node:http')
const { Server } = require('socket.io')

const Chat = require('./models/chat')
const chatHandler = require('./handlers/chatHandler')
const connectHandler = require('./handlers/connectHandler')

const app = express()
const server = createServer(app)

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('conected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

const io = new Server(server, {
  cors: true,
  connectionStateRecovery: {},
})

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

app.delete('/', async (req, res) => {
  await Chat.deleteMany()
  res.json({ status: 'delete success' })
})

io.on('connection', (socket) => {
  connectHandler(io, socket)
  chatHandler(io, socket)
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
