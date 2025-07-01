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

// הוספת פריט לחדר של משתמש
router.put(
  '/:userId/rooms/:roomId/items',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId, roomId } = req.params
      const item = req.body.item || req.body

      if (!item) return res.status(400).json({ error: 'Item data missing' })

      const user = await User.findById(userId)
      if (!user) return res.status(404).json({ error: 'User not found' })

      const room = user.rooms.id(roomId)
      if (!room) return res.status(404).json({ error: 'Room not found' })

      room.items.push(item)
      await user.save()

      res.status(200).json(room.items)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  }
)

// שליפת פריט מחדר של משתמש

router.get(
  '/:userId/rooms/:roomId/items',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId, roomId } = req.params

      const user = await User.findById(userId)
      if (!user) return res.status(404).json({ error: 'User not found' })

      const room = user.rooms.id(roomId)
      if (!room) return res.status(404).json({ error: 'Room not found' })

      res.status(200).json(room.items)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  }
)
