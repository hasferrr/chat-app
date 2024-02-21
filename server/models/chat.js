const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  epochTime: {
    type: Number,
    required: true,
  },
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
