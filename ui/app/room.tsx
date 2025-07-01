import AddFormDialog from '@/components/formDialog'
import {
  addItemToUserRoom,
  fetchRoomItems,
  ItemType,
} from '@/services/userService'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Room() {
  const params = useLocalSearchParams() as { userId?: string; roomId?: string }
  const userId = params.userId
  const roomId = params.roomId
  const [items, setItems] = useState<ItemType[]>([])
  const [visible, setVisible] = useState(false)

  const fieldNames = ['Item Title', 'Item Amount', 'Item Location', 'Item Date']

  useEffect(() => {
    if (!userId || !roomId) return

    async function loadItems() {
      try {
        if (!userId || !roomId) {
          console.error('Missing userId or roomId')
          return
        }
        const data = await fetchRoomItems(userId, roomId)
        setItems(data)
      } catch (error) {
        console.error('❌ Failed to load items', error)
      }
    }
    loadItems()
  }, [userId, roomId])

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  const handleSubmit = async (values: string[]) => {
    if (!userId || !roomId) {
      console.error('Missing userId or roomId')
      return
    }

    const newItem: ItemType = {
      title: values[0],
      amount: values[1] ? Number(values[1]) : 0,
      location: values[2],
      date: values[3],
    }

    try {
      const updatedItems = await addItemToUserRoom(userId, roomId, newItem)
      setItems(updatedItems)
      hideDialog()
    } catch (error) {
      console.error('❌ Failed to add item', error)
    }
  }

  return (
    <PaperProvider>
      <SafeAreaView
        className='flex-1 bg-white'
        edges={['right', 'bottom', 'left']}
      >
        <LinearGradient
          className='relative items-center'
          colors={['#25c0de', '#08a2ec']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={{ flex: 1 }}
        >
          <View className='flex-col items-center mt-10 w-full px-4'>
            <Text className='text-3xl text-white font-bold'>Room Items</Text>
            {items.length === 0 && (
              <Text className='text-white mt-4'>No items yet</Text>
            )}
            {items.map((item, index) => (
              <View
                key={index}
                className='bg-white p-4 rounded-lg shadow-md w-full mt-4'
              >
                <Text className='text-lg font-semibold'>{item.title}</Text>
                <Text>Amount: {item.amount || 0}</Text>
                <Text>Location: {item.location}</Text>
                <Text>Date: {item.date}</Text>
              </View>
            ))}
          </View>

          <View className='absolute bottom-0 w-[98%] rounded-lg mb-4 px-4'>
            <TouchableOpacity
              onPress={showDialog}
              className='bg-blue-500 py-4 rounded-full'
            >
              <Text className='text-white text-center font-bold'>ADD ITEM</Text>
            </TouchableOpacity>
          </View>

          <AddFormDialog
            visible={visible}
            onDismiss={hideDialog}
            onSubmit={handleSubmit}
            title='Create New Item'
            values={['', '', '', '']}
            placeholders={fieldNames}
          />
        </LinearGradient>
      </SafeAreaView>
    </PaperProvider>
  )
}
