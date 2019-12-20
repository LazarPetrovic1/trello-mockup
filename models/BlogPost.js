const mongoose = require('mongoose')
const { Schema, model } = mongoose

const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    unique: true
  },
  process: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Blog = model('blog', BlogSchema)
