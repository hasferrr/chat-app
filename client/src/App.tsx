import { ModeToggle } from '@/components/mode-toggle'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { socket } from './socket'

const App = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('message', message)
    setMessage('')
  }

  return (
    <div className={cn('container', 'mx-auto', 'px-4', 'h-screen')}>
      <ModeToggle />
      <form onSubmit={handleSubmit}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}

export default App
