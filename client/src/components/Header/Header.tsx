import { useNavigate } from 'react-router-dom'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
  useConnect,
  useDisconnect,
  useIsConnected,
} from '@/context/isConnectedContext'
import { useRemoveUser, useUser } from '@/context/userContext'

const Header = () => {
  const isConnected = useIsConnected()
  const connect = useConnect()
  const disconnect = useDisconnect()
  const user = useUser()
  const removeUser = useRemoveUser()

  const navigate = useNavigate()

  const logOutHandler = () => {
    removeUser()
    navigate('/')
  }

  const logInHandler = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <ModeToggle />
      <p className="text-xl">
        {user ? `Hello ${user.username}!` : 'Please Log In'}
      </p>
      <div className="grow"></div>
      <div className="text-xl font-bold">
        Status:{' '}
        <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <Button
        type="button"
        onClick={isConnected ? disconnect : connect}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
      <Button
        type="button"
        onClick={user ? logOutHandler : logInHandler}
      >
        {user ? 'Log Out' : 'Log In'}
      </Button>
    </div>
  )
}

export default Header
