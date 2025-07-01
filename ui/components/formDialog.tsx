import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'

type AddFormDialogProps = {
  visible: boolean
  onDismiss: () => void
  onSubmit: (values: string[]) => void
  values: string[]
  title: string
  placeholders: string[]
}

const AddFormDialog = ({
  visible,
  onDismiss,
  onSubmit,
  title,
  values,
  placeholders,
}: AddFormDialogProps) => {
  const [localValues, setLocalValues] = useState<string[]>([])

  useEffect(() => {
    if (visible) {
      setLocalValues(values)
    }
  }, [visible, values])

  const handleChange = (text: string, index: number) => {
    const newValues = [...localValues]
    newValues[index] = text
    setLocalValues(newValues)
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <View>
            {localValues.map((value, index) => (
              <TextInput
                key={index}
                placeholder={placeholders[index]}
                onChangeText={(text) => handleChange(text, index)}
                value={value}
              />
            ))}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button onPress={() => onSubmit(localValues)}>
              <Text style={{ color: 'green' }}>OK</Text>
            </Button>
            <Button onPress={onDismiss}>
              <Text style={{ color: 'red' }}>CANCEL</Text>
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default AddFormDialog
