import User from '../models/user'

export const addRoomToUser = async (userId: string, room: any) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')

  user.rooms.push(room)
  await user.save()

  return user.rooms
}

export const addItemsToUserRoom = async (
  userId: string,
  roomId: string,
  item: any
) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  const room = user.rooms.id(roomId)
  if (!room) throw new Error('Room not found')
  room.items.push(item)
  await user.save()
  return room.items
}
