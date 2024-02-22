import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

import socket from '@/utils/socket'

const Header = ({
  isConnected,
  setIsConnected,
}: {
  isConnected: boolean
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <ModeToggle />
      <p className="text-xl">Hello Username!</p>
      <div className="grow"></div>
      <div className="text-xl font-bold">
        Status:{' '}
        {isConnected ? (
          <span className="text-green-600">Connected</span>
        ) : (
          <span className="text-red-600">Disconnected</span>
        )}
      </div>
      {isConnected ? (
        <Button
          type="button"
          onClick={() => {
            socket.disconnect()
            setIsConnected(!isConnected)
          }}
        >
          Disconnect
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => {
            socket.connect()
            setIsConnected(!isConnected)
          }}
        >
          Connect
        </Button>
      )}
      <Button>Log Out</Button>
    </div>
  )
}

export default Header
