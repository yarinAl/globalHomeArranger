import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import { PaperProvider } from 'react-native-paper'

import React, { useEffect, useState } from 'react'

import AddFormDialog from '@/components/formDialog'
import { addRoomToUser, RoomData } from '@/services/userService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link } from 'expo-router'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'

interface Room {
  _id: string
  title: string
  description: string
  src?: string
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [values, setValues] = useState<string[]>(['', '', ''])
  const [visible, setVisible] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId')
      if (storedUserId) {
        console.log('Loaded userId:', storedUserId)
        setUserId(storedUserId)
      } else {
        console.warn('No userId found in AsyncStorage')
      }
    }

    loadUserId()
  }, [])

  useEffect(() => {
    if (!userId) return

    async function loadRooms() {
      try {
        const res = await fetch(
          `http://10.0.0.5:5000/api/users/${userId}/rooms`
        )
        if (!res.ok) throw new Error('Failed to fetch rooms')
        const roomsData = await res.json()
        setRooms(roomsData)
      } catch (error) {
        console.error(error)
      }
    }

    loadRooms()
  }, [userId])

  const handleSubmit = async (values: string[]) => {
    if (!userId) {
      console.error('User ID is missing')
      return
    }

    const newRoom: RoomData = {
      title: values[0],
      description: values[1],
      src: values[2],
      items: [],
    }

    try {
      const updatedRooms = await addRoomToUser(userId, newRoom)
      setRooms(updatedRooms)
      hideDialog()
    } catch (error: any) {
      console.error('Failed to add room:', error.message)
    }
  }

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  return (
    <PaperProvider>
      <SafeAreaView
        className='flex-1 bg-white'
        edges={['right', 'bottom', 'left']}
      >
        <View className='h-[100%] relative'>
          <LinearGradient
            className='relative'
            colors={['#25c0de', '#08a2ec']}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={{ flex: 1 }}
          >
            <View className='flex-col'>
              <View className='max-h-60 text-center flex justify-center items-center max-w-[95%]'>
                <Text className='text-7xl text-white'>
                  <Image
                    resizeMode='contain'
                    className='w-70 h-70'
                    source={require('../assets/images/hero_image.png')}
                  />
                </Text>
              </View>
              <Text className='font-bold text-3xl mt-20 text-start ml-12'>
                House Rooms
              </Text>
              {rooms.map((room) => (
                <Link
                  key={room._id}
                  href={`/room?userId=${userId}&roomId=${room._id}`}
                  asChild
                >
                  <TouchableOpacity>
                    <View className='bg-white m-4 p-4 rounded-lg shadow-lg'>
                      <Text>{room.title}</Text>
                      <Text>{room.description}</Text>

                      <Image
                        source={{
                          uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
                        }}
                        style={{ width: 50, height: 50 }} // חובה להגדיר מידות
                      />
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
            <View>
              <AddFormDialog
                visible={visible}
                onDismiss={hideDialog}
                onSubmit={handleSubmit}
                title={'Create New Room'}
                values={values}
                placeholders={[
                  'Room Name',
                  'Room Description',
                  'Room Image URL',
                ]}
              />
            </View>
          </LinearGradient>
          <View className='absolute flex-row justify-center items-center gap-4 bottom-0 h-20 bg-[#003966] w-full'>
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
