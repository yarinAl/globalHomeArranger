import User from '../models/user'

export const addRoomToUser = async (userId: string, room: any) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')

  user.rooms.push(room)
  await user.save()

  return user.rooms
}
