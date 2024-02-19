require('dotenv').config()
const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const { Chat } = require('./models')

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: true,
  connectionStateRecovery: {},
})

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/del', async (req, res) => {
  await Chat.deleteMany()
  res.json({ status: 'delete success' })
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('message', async (msg) => {
    const chat = new Chat({
      message: msg,
    })
    try {
      const addedMsg = await chat.save()
      console.log(addedMsg)
      io.emit('message', msg)
    } catch (err) {
      console.log(err.message)
    }
  })
})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
