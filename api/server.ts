import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { router as loginRouter } from './routers/loginRouter'
import { router as registerRouter } from './routers/registerRouter'
import userRouter from './routers/userRouter'

require('dotenv').config()

const app = express()
const PORT = 5000
app.use(cors())
app.use(express.json())

// Routes
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/api/users', userRouter)
// app.use('/api', userRouter)

mongoose
  .connect(process.env.MONGO_URI ?? '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
