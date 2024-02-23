/* eslint-disable no-underscore-dangle */
require('dotenv').config()
const jwt = require('jsonwebtoken')

const Chat = require('../models/chat')
const User = require('../models/user')

module.exports = async (io, socket) => {
  let chats = await Chat.find({}).populate('user', { username: 1 })
  chats = chats.map((chat) => ({
    author: chat.user.username,
    message: chat.message,
    epochTime: chat.epochTime,
  }))
  socket.emit('get-message', chats)

  socket.on('message', async (msg) => {
    const { token } = socket.handshake.auth
    if (!token) {
      console.log('please provide the token')
      return
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      console.log('invalid token')
      return
    }

    let user
    try {
      user = await User.findById(decodedToken.id)
    } catch (e) {
      console.log(e.message)
    }

    const chat = new Chat({
      message: msg,
      epochTime: Date.now(),
      user: user._id,
    })

    try {
      const addedChat = await chat.save()
      user.chats = user.chats.concat(addedChat._id)
      await user.save()
      io.emit('message', {
        author: user.username,
        message: addedChat.message,
        epochTime: addedChat.epochTime,
      })
    } catch (err) {
      console.log(err.message)
    }
  })
}
