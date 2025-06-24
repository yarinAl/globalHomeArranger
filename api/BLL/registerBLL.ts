import User from '../models/user'
export const newUser = async (userData: {
  email: string
  password: string
  cells?: {
    title: string
    description: string
    src?: string
    items?: {
      title: string
      amount?: number
      location: string
      date: string
    }[]
  }[]
}) => {
  const user = new User(userData)
  return await user.save()
}
