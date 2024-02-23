const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  epochTime: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
