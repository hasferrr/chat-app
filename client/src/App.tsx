import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { cn } from '@/lib/utils'

import authentication from './services/authentication'
import socket from './utils/socket'
import Header from './components/Header/Header'
import Chats from './components/Chats/Chats'
import Form from './components/Form/Form'
import AuthForm from './components/AuthForm/AuthForm'
import { IChat } from './types/interfaces'

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
    <Routes>
      <Route
        path="/"
        element={
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
        }
      />
      <Route
        path="/login"
        element={
          <AuthForm
            title={'Login'}
            submitHandler={authentication.login}
          />
        }
      />
      <Route
        path="/register"
        element={
          <AuthForm
            title={'Register'}
            submitHandler={authentication.register}
          />
        }
      />
    </Routes>
  )
}

export default App
