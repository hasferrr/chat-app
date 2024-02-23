require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { createServer } = require('node:http')
const { Server } = require('socket.io')

const Chat = require('./models/chat')
const User = require('./models/user')
const authenticationRouter = require('./controllers/authentication')
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

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

app.delete('/', async (req, res) => {
  await Chat.deleteMany()
  await User.updateMany({}, { $set: { chats: [] } })
  res.json({ status: 'delete success' })
})

app.use('/', authenticationRouter)

io.on('connection', (socket) => {
  connectHandler(io, socket)
  chatHandler(io, socket)
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
