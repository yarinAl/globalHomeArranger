import express, { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { login } from '../BLL/loginBLL'

export const router = express.Router()

router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await login(req.body)
    if (!user) {
      return res.status(401).send('Invalid email!')
    }
    if (user.password !== req.body.password) {
      return res.status(401).send('Invalid password')
    }
    const payload = { subject: user._id }
    const token = sign(payload, 'secretKey')
    return res.status(200).send({ token, userId: user._id.toString() })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal Server Error')
  }
})
