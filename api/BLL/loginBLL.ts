import User from '../models/user'

export const login = async (userData: any) => {
  const foundUser = await User.findOne({ email: userData.email })
  return foundUser
}
