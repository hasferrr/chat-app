const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server, { cors: true })

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('message', (msg) => {
    console.log(msg)
  })
})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
