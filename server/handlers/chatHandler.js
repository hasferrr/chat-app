const Chat = require('../models/chat')

module.exports = async (io, socket) => {
  const chats = await Chat.find()
  socket.emit('get-message', chats)

  socket.on('message', async (msg) => {
    const chat = new Chat({
      author: 'Hasfer',
      message: msg,
      epochTime: Date.now(),
    })
    try {
      const addedChat = await chat.save()
      console.log(addedChat)
      io.emit('message', addedChat)
    } catch (err) {
      console.log(err.message)
    }
  })
}
