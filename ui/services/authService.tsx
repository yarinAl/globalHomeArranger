import axios, { AxiosError } from 'axios'

const API_URL = 'http://10.0.0.5:5000'

export interface RegisterResponse {
  msg: string
  token?: string
}

export interface LoginResponse {
  msg: string
  token: string
}

export const register = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const res = await axios.post<RegisterResponse>(`${API_URL}/register`, {
      email,
      password,
    })
    return res.data
  } catch (error: unknown) {
    const err = error as AxiosError<{ msg?: string }>
    const message = err.response?.data?.msg ?? 'Registration failed'
    throw new Error(message)
  }
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>(`${API_URL}/login`, {
      email,
      password,
    })
    return res.data // { msg: 'Login successful', token: '...' }
  } catch (error) {
    const err = error as AxiosError<{ msg?: string }>
    const message = err.response?.data?.msg ?? 'Login failed'
    throw new Error(message)
  }
}
