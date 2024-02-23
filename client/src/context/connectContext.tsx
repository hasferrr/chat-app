import { createContext, useReducer, useContext, Dispatch } from 'react'
import socket from '@/utils/socket'

type ConnectedDispatch = { type: 'CONNECT' | 'DISCONNECT' }
type ConnectedReducer = [boolean, Dispatch<ConnectedDispatch>]

const ConnectedReducer = (
  state: boolean,
  action: ConnectedDispatch
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

const ConnectedContext = createContext<ConnectedReducer>([
  false,
  () => false,
])

export const ConnectedContextProvider: React.FC<{
  children?: React.ReactNode
}> = (props) => {
  const [isConnected, ConnectedDispatch] = useReducer(
    ConnectedReducer,
    false
  )
  return (
    <ConnectedContext.Provider value={[isConnected, ConnectedDispatch]}>
      {props.children}
    </ConnectedContext.Provider>
  )
}

export const useIsConnected = () => {
  const [value] = useContext(ConnectedContext)
  return value
}

export const useConnect = () => {
  const [, dispatch] = useContext(ConnectedContext)
  return () => {
    const user = window.localStorage.getItem('user')
    const token = user ? JSON.parse(user).token : null
    socket.auth = { token }
    socket.connect()
    dispatch({ type: 'CONNECT' })
  }
}

export const useDisconnect = () => {
  const [, dispatch] = useContext(ConnectedContext)
  return () => {
    socket.auth = { token: null }
    socket.disconnect()
    dispatch({ type: 'DISCONNECT' })
  }
}

export default ConnectedContext
