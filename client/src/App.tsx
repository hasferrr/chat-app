import { ModeToggle } from '@/components/mode-toggle'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { socket } from './socket'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('message', inputValue)
    setInputValue('')
  }

  socket.on('message', (msg: string) => {
    setMessages([...messages, msg])
  })

  return (
    <div className={cn('container', 'mx-auto', 'px-4', 'h-screen')}>
      <ModeToggle />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="type a message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}

export default App
