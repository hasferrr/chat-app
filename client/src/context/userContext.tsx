import { createContext, useReducer, useContext, Dispatch } from 'react'

export type User = { token: string; username: string } | null
type UserDispatch = { type: 'SET' | 'REMOVE'; payload: User }
type UserReducer = [User, Dispatch<UserDispatch>]

const userReducer = (state: User, action: UserDispatch) => {
  switch (action.type) {
    case 'SET':
      return state
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const UserContext = createContext<UserReducer>([null, () => null])

export const UserContextProvider: React.FC<{
  children?: React.ReactNode
}> = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const [value] = useContext(UserContext)
  return value
}

export const useSetUser = () => {
  const [, dispatch] = useContext(UserContext)
  return (newUser: User) => {
    dispatch({
      type: 'SET',
      payload: newUser,
    })
    window.localStorage.setItem('user', JSON.stringify(newUser))
  }
}

export const useSemoveUser = () => {
  const [, dispatch] = useContext(UserContext)
  return () => {
    dispatch({
      type: 'REMOVE',
      payload: null,
    })
    window.localStorage.removeItem('user')
  }
}

export default UserContext
