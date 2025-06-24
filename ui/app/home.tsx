import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  TextInput,
} from 'react-native-paper'

import React, { useState } from 'react'

import { Link } from 'expo-router'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'
export default function Home() {
  const [boxes, setBoxes] = useState(['בדיקה'])
  const [name, onChangeName] = React.useState('')

  const [visible, setVisible] = React.useState(false)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)
  const addRoom = (name: string) => {
    setBoxes([...boxes, name])
    hideDialog()
  }

  return (
    <PaperProvider>
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
              <Text className=' font-bold text-3xl mt-20 text-start ml-12'>
                House Rooms
              </Text>
              {boxes
                .filter((box) => box != '')
                .map((box, index) => (
                  <Link href={`/room?name=${box}`} asChild key={index}>
                    <TouchableOpacity>
                      <View className='bg-white m-4 p-4 rounded-lg shadow-lg'>
                        <Text>{box}</Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                ))}
            </View>
            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>
                    <Text>Create new Room</Text>
                  </Dialog.Title>
                  <Dialog.Content>
                    <TextInput
                      onChangeText={onChangeName}
                      value={name}
                    ></TextInput>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <View className='flex-row justify-between w-full'>
                      <Button onPress={() => addRoom(name)}>
                        <Text className=' text-green-500'>OK</Text>
                      </Button>
                      <Button className='uppercase' onPress={hideDialog}>
                        <Text className=' text-red-500'>CANCEL</Text>
                      </Button>
                    </View>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </LinearGradient>
          <View className='absolute flex-row justify-center items-center gap-4 bottom-0 h-20 bg-[#003966]  w-full'>
            <Pressable className='flex-1 justify-center items-center'>
              <Feather name='menu' size={20} color='white' />
              <Text className='text-white'>Menu</Text>
            </Pressable>
            <Pressable
              onPress={showDialog}
              className='flex-1 justify-center items-center'
            >
              <Entypo name='plus' size={20} color='white' />
              <Text className='text-white'>Add Room</Text>
            </Pressable>

            <Pressable className='flex-1 justify-center items-center'>
              <FontAwesome name='camera' size={20} color='white' />
              <Text className='text-white'>Camera</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  )
}
