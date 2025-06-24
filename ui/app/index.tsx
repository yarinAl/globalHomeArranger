import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'
export default function landing() {
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
            <View className='flex-col justify-between items-center max-w-[95%] '>
              <Text className=' font-bold text-5xl mt-20 text-start ml-12  text-white'>
                Welcome
              </Text>
              <Text className=' font-bold text-xl mt-5 text-start ml-12   text-white'>
                login/register
              </Text>
              <View className='flex-col justify-between items-center max-w-[100%] mt-10'>
                <View className='min-w-[95%] flex-col  '>
                  <Pressable onPress={() => router.navigate('/signIn')}>
                    <View className=' rounded-full mb-5   p-3  bg-white'>
                      <Text className='text-xl font-bold text-center'>
                        LOGIN
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={() => router.navigate('/signUp')}>
                    <View className=' rounded-full mb-5   p-3  bg-white'>
                      <Text className='text-xl font-bold text-center'>
                        REGISTER
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
