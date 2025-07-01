import User from '../models/user'

export const newUser = async (userData: {
  email: string
  password: string
  rooms?: {
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
  try {
    const user = new User(userData)
    return await user.save()
  } catch (err: any) {
    if (err.code === 11000) {
      // מייל כבר קיים
      throw new Error('Email already exists')
    }
    throw err
  }
}
