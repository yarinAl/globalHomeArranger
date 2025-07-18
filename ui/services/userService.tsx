// const API_BASE = 'http://10.0.0.5/api'
export async function fetchUserRooms(userId: string) {
  const res = await fetch(`http://10.0.0.5:5000/api/users/${userId}/rooms`)
  if (!res.ok) {
    throw new Error('Failed to fetch user rooms')
  }
  return res.json()
}
export interface RoomData {
  title: string
  description: string
  src?: string
  items?: {
    title: string
    amount?: number
    location: string
    date: string
  }[]
}
export async function addRoomToUser(userId: string, room: RoomData) {
  const res = await fetch(`http://10.0.0.5:5000/api/users/${userId}/rooms`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ room }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.msg || 'Failed to add room')
  }

  return res.json()
}

export interface ItemType {
  title: string
  amount?: number
  location: string
  date: string
  imgSrc?: string
}

export async function addItemToUserRoom(
  userId: string,
  roomId: string,
  item: ItemType
) {
  const res = await fetch(
    `http://10.0.0.5:5000/api/users/${userId}/rooms/${roomId}/items`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item), // או { item } אם השרת מצפה לזה
    }
  )

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.msg || 'Failed to add item')
  }

  return res.json()
}

export async function fetchRoomItems(userId: string, roomId: string) {
  const res = await fetch(
    `http://10.0.0.5:5000/api/users/${userId}/rooms/${roomId}/items`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch room items')
  }

  return res.json() as Promise<ItemType[]>
}
