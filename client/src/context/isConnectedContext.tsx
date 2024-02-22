import { createContext, useReducer, useContext, Dispatch } from 'react'
import socket from '@/utils/socket'

interface IsConnectedDispatch {
  type: 'CONNECT' | 'DISCONNECT'
  payload: boolean
}
type IsConnectedReducer = [boolean, Dispatch<IsConnectedDispatch>]

const isConnectedReducer = (
  state: boolean,
  action: IsConnectedDispatch
): boolean => {
  switch (action.type) {
    case 'CONNECT':
      return true
    case 'DISCONNECT':
      return false
    default:
      return state
  }
}

const IsConnectedContext = createContext<IsConnectedReducer>([
  false,
  () => false,
])

export const IsConnectedContextProvider: React.FC<{
  children?: React.ReactNode
}> = (props) => {
  const [isConnected, isConnectedDispatch] = useReducer(
    isConnectedReducer,
    false
  )
  return (
    <IsConnectedContext.Provider value={[isConnected, isConnectedDispatch]}>
      {props.children}
    </IsConnectedContext.Provider>
  )
}

export const useIsConnected = () => {
  const [value] = useContext(IsConnectedContext)
  return value
}

export const useConnect = () => {
  const [, dispatch] = useContext(IsConnectedContext)
  return () => {
    socket.connect()
    dispatch({
      type: 'CONNECT',
      payload: true,
    })
  }
}

export const useDisconnect = () => {
  const [, dispatch] = useContext(IsConnectedContext)
  return () => {
    socket.disconnect()
    dispatch({
      type: 'DISCONNECT',
      payload: false,
    })
  }
}

export default IsConnectedContext
