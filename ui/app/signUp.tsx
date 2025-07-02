import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'
import { register } from '../services/authService'

export default function SignUp() {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [mailError, setMailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const validateMail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // בדיקת תקינות כתובת האימייל
    setMailError(emailRegex.test(email) ? false : true)
  }
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // בדיקת תקינות סיסמה
    setPasswordError(passwordRegex.test(password) ? false : true)
  }
  const handleRegister = async () => {
    try {
      const result = await register(email, password)
      console.log('המשתמש נרשם בהצלחה:', result)
      alert('Registration successful')
      router.navigate('/signIn') // מעבר למסך ההתחברות
    } catch (error: unknown) {
      // מחרוזת ברירת‑מחדל
      let message = 'Registration failed'

      // Axios error?
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.msg ?? error.message
      }
      // שגיאה רגילה?
      else if (error instanceof Error) {
        message = error.message
      }

      console.error('שגיאה בהרשמה:', error)
      Alert.alert('Registration error', message)
    }
  }
  return (
    <SafeAreaView
      className='flex-1  bg-white'
      edges={['right', 'bottom', 'left']}
    >
      <View className=' h-[100%] relative'>
        <LinearGradient
          className='relative'
          colors={['#25c0de', '#08a2ec']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={{ flex: 1 }}
        >
          <View className='  flex-col'>
            <View className='max-h-60 text-center flex justify-center items-center max-w-[95%]'>
              <Text className='text-7xl  text-white'>
                <Image
                  resizeMode='contain'
                  className='w-70 h-70'
                  source={require('../assets/images/hero_image.png')}
                />
              </Text>
            </View>
            <View className='flex-col items-center max-w-[95%] '>
              <Text className=' font-bold text-5xl mt-20 leading-[54px] ml-12  text-white'>
                Register
              </Text>

              <View className='flex-col justify-between items-center max-w-[100%] mt-20'>
                <View className='min-w-[95%] flex-col  '>
                  <View className='min-w-[95%] flex-col mb-20 '>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder='Email'
                      className={` border border-black mb-5 rounded-xl  p-3 bg-white ${
                        mailError ? 'border-red-500 mb-3' : 'border-black'
                      }`}
                      onBlur={validateMail}
                    ></TextInput>
                    {mailError && (
                      <Text className='text-red-600 mb-2 pl-2'>
                        Invalid Mail Adress{' '}
                      </Text>
                    )}

                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder='Password'
                      className={` border rounded-xl border-black mb-5   p-3  bg-white ${
                        passwordError ? 'border-red-500 mb-3' : 'border-black'
                      }`}
                      onBlur={validatePassword}
                    ></TextInput>
                    {passwordError && (
                      <Text className='text-red-600 max-w-[95%] mt-2 pl-2'>
                        Password must be at least 8 characters long, include
                        uppercase, lowercase, a number, and a special character
                      </Text>
                    )}
                  </View>

                  <Pressable onPress={() => handleRegister()}>
                    <View className=' rounded-full mb-5   p-3  bg-white'>
                      <Text className='text-xl font-bold text-center'>
                        Register
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}
