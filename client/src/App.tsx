import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import authentication from './services/authentication'
import socket from './utils/socket'
import Header from './components/Header/Header'
import Chats from './components/Chats/Chats'
import Form from './components/Form/Form'
import AuthForm from './components/AuthForm/AuthForm'
import { IChat } from './types/interfaces'

import { useAppendOneChat, useSetChats } from './context/chatsContext'
import { useConnect } from './context/isConnectedContext'
import { useUser } from './context/userContext'

const App = () => {
  const setChats = useSetChats()
  const appendOneChat = useAppendOneChat()
  const connect = useConnect()
  const user = useUser()

  useEffect(() => {
    connect()
  }, [])

  socket.on('message', (chat: IChat) => {
    appendOneChat(chat)
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
          <div className="flex flex-col justify-center h-screen max-w-2xl mx-auto px-1">
            <Header />
            <Chats />
            <Form />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          !user ? (
            <AuthForm
              title={'Login'}
              submitHandler={authentication.login}
            />
          ) : (
            <Navigate
              replace
              to="/"
            />
          )
        }
      />
      <Route
        path="/register"
        element={
          !user ? (
            <AuthForm
              title={'Register'}
              submitHandler={authentication.register}
            />
          ) : (
            <Navigate
              replace
              to="/"
            />
          )
        }
      />
    </Routes>
  )
}

export default App
