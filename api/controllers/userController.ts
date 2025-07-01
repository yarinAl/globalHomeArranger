import { Request, Response } from 'express'
import { addItemsToUserRoom, addRoomToUser } from '../BLL/userBLL'

export const addRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.userId
    const room = req.body.room // פה - משנה לקבלת האובייקט מה-body

    if (!room) {
      res.status(400).json({ msg: 'Room data is required' })
      return
    }

    const updatedRooms = await addRoomToUser(userId, room)
    res.status(200).json(updatedRooms)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ msg: error.message || 'Internal Server Error' })
  }
}

export const addItemToRoomHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId
    const roomId = req.params.roomId
    const item = req.body.item

    if (!item) {
      res.status(400).json({ msg: 'Item data is required' })
      return
    }

    const updatedItems = await addItemsToUserRoom(userId, roomId, item)

    res.status(200).json(updatedItems)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ msg: error.message || 'Internal Server Error' })
  }
}
