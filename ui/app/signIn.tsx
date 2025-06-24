import { login } from '@/services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('חובה למלא דוא״ל וסיסמה')
      return
    }
    setLoading(true)
    try {
      const { token } = await login(email, password) // קריאה ל‑API
      await AsyncStorage.setItem('token', token) // שמירת הטוקן
      console.log('Received token:', token) // לוג תקין
      Alert.alert('התחברת בהצלחה!')
      router.navigate('/home') // מעבר למסך הבית
    } catch (err) {
      Alert.alert('שגיאה', (err as Error).message)
    } finally {
      setLoading(false)
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
                Login
              </Text>

              <View className='flex-col justify-between items-center max-w-[100%] mt-20'>
                <View className='min-w-[95%] flex-col  '>
                  <View className='min-w-[95%] flex-col mb-20 '>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder='Email'
                      className=' border font-bold border-black mb-5   p-3  bg-white'
                    ></TextInput>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder='Password'
                      className=' border border-black mb-5   p-3  bg-white'
                    ></TextInput>
                  </View>

                  <Pressable onPress={() => handleLogin()}>
                    <View className=' rounded-full mb-5   p-3  bg-white'>
                      <Text className='text-xl font-bold text-center'>
                        LOGIN
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
