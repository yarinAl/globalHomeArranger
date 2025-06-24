import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'
export default function Room() {
  const [products, setProducts] = React.useState<string[]>([])
  const addProduct = (name: string) => {
    setProducts([...products, name])
  }
  return (
    <SafeAreaView
      className='flex-1  bg-white'
      edges={['right', 'bottom', 'left']}
    >
      <LinearGradient
        className='relative items-center'
        colors={['#25c0de', '#08a2ec']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={{ flex: 1 }}
      >
        <View className='absolute  bottom-0 w-[98%] rounded-lg mb-4'>
          <TouchableOpacity className='bg-blue-500 py-4 rounded-full'>
            <Text className='text-white text-center font-bold'>ADD ITEM</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}
