import { IChat } from '@/types/interfaces'
import { createContext, useReducer, useContext, Dispatch } from 'react'

type Chat = IChat
type Chats = Chat[]
type ChatsDispatch = { type: 'SET'; payload: Chats }
type ChatsReducer = [Chats, Dispatch<ChatsDispatch>]

const chatsReducer = (state: Chats, action: ChatsDispatch): Chats => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const ChatsContext = createContext<ChatsReducer>([[], () => []])

export const ChatsContextProvider: React.FC<{
  children?: React.ReactNode
}> = (props) => {
  const [chats, chatsDispatch] = useReducer(chatsReducer, [])
  return (
    <ChatsContext.Provider value={[chats, chatsDispatch]}>
      {props.children}
    </ChatsContext.Provider>
  )
}

export const useChats = () => {
  const [value] = useContext(ChatsContext)
  return value
}

export const useSetChats = () => {
  const [, dispatch] = useContext(ChatsContext)
  return (chats: Chats) => {
    dispatch({
      type: 'SET',
      payload: chats,
    })
  }
}

export const useAppendOneChat = () => {
  const [state, dispatch] = useContext(ChatsContext)
  return (chat: Chat) => {
    dispatch({
      type: 'SET',
      payload: state.concat(chat),
    })
  }
}

export default ChatsContext
