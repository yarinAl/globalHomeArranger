import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, default: 0 },
  location: { type: String, required: true },
  date: { type: String, required: true },
  imgSrc: { type: String },
})

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgSrc: { type: String },
  items: [itemSchema],
})

const Schema = mongoose.Schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rooms: [roomSchema],
})

export default mongoose.model('user', userSchema, 'users')
