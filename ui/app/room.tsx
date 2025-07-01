import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'

import AddFormDialog from '@/components/formDialog'
import { Text, TouchableOpacity, View } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'
export default function Room() {
  const [items, setItems] = React.useState<string[]>([])
  const [values, setValues] = React.useState<string[]>(['', '', '', ''])
  const [visible, setVisible] = React.useState(false)
  const fieldNames = ['Item Title', 'Item Amount', 'Item Location', 'Item Date']
  const handleSubmit = (values: string[]) => {
    setItems([...items, values[0]])
    hideDialog()
  }
  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  const addProduct = (name: string) => {
    setItems([...items, name])
  }
  return (
    <PaperProvider>
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
          <View className='flex-col items-center mt-10'>
            <Text className='text-3xl text-white font-bold'>Room Items</Text>
            {items
              .filter((item) => item != '')
              .map((item, index) => (
                <View
                  key={index}
                  className='bg-white p-4 rounded-lg shadow-md w-[95%] mt-4'
                >
                  <Text className='text-lg font-semibold'>{item}</Text>
                </View>
              ))}
          </View>
          <View className='absolute  bottom-0 w-[98%] rounded-lg mb-4'>
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
            title={'Create New Item'}
            values={values}
            placeholders={fieldNames}
          ></AddFormDialog>
        </LinearGradient>
      </SafeAreaView>
    </PaperProvider>
  )
}
