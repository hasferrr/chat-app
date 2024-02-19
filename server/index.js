const express = require('express')
const { createServer } = require('node:http')

const app = express()
const server = createServer(app)

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
