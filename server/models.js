const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('conected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = {
  Chat,
}
