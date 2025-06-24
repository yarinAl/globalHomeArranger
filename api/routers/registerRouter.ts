import express from 'express'
import { sign } from 'jsonwebtoken'
import { newUser } from '../BLL/registerBLL'

export const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const registeredUser = await newUser(req.body)
    const payload = { subject: registeredUser._id }
    const token = sign(payload, 'secretKey')
    res.status(200).json({ msg: 'User registered successfully', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Internal Server Error' }) //
  }
})
