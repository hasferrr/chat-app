const Chat = require('../models/chat')

module.exports = async (io, socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}
