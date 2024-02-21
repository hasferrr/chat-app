import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

import socket from './utils/socket'
import Header from './components/Header/Header'
import Chats from './components/Chats/Chats'
import Form from './components/Form/Form'

export interface IChat {
  author: string
  message: string
  epochTime: number
}

const App = () => {
  const [chats, setChats] = useState<IChat[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.connect()
    setIsConnected(true)
  }, [])

  socket.on('message', (chat: IChat) => {
    setChats([...chats, chat])
  })

  socket.on('get-message', (chats: IChat[]) => {
    setChats(
      chats.map((chat) => ({
        author: chat.author,
        message: chat.message,
        epochTime: chat.epochTime,
      }))
    )
  })

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'justify-center',
        'h-screen',
        'max-w-2xl',
        'mx-auto',
        'px-1'
      )}
    >
      <Header
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      <Chats chats={chats} />
      <Form />
    </div>
  )
}

export default App
