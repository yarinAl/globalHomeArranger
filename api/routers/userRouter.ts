// import express, { Request, Response } from 'express'
// import User from '../models/user'

// const router = express.Router()

// router.put('/:id/rooms', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const user = await User.findById(req.params.id)
//     if (!user) return res.status(404).json({ error: 'User not found' })

//     const newRoom = req.body.room
//     if (!newRoom) return res.status(400).json({ error: 'Room data missing' })

//     user.rooms.push(newRoom)
//     await user.save()

//     res.status(200).json(user.rooms)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Server error' })
//   }
// })

// export default router

import express, { Request, Response } from 'express'
import User from '../models/user'

const router = express.Router()

// שמירת חדר למשתמש
router.put(
  '/:userId/rooms',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.params.userId)
      if (!user) return res.status(404).json({ error: 'User not found' })

      // בדיקה נכונה אם יש מידע על החדר ב-body
      const newRoom = req.body.room || req.body
      if (!newRoom) return res.status(400).json({ error: 'Room data missing' })

      user.rooms.push(newRoom)
      await user.save()

      res.status(200).json(user.rooms)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  }
)

// שליפת חדרים של משתמש
router.get('/:id/rooms', async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.status(200).json(user.rooms)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
export default router
