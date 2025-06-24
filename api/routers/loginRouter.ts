import express from 'express'
import { sign } from 'jsonwebtoken'
import { login } from '../BLL/loginBLL'

export const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const user = await login(req.body)
    console.log('user data is:' + user)
    if (!user) {
      res.status(401).send('Invalid email!')
    } else if (user.password !== req.body.password) {
      res.status(401).send('Invalid password')
    } else {
      let payload = { subject: user._id }
      let token = sign(payload, 'secretKey')
      res.status(200).send({ token })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})
