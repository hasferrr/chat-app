import { useEffect, useRef, useState } from 'react'
import { socket } from './socket'

import { ModeToggle } from '@/components/mode-toggle'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)

  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket.connect()
    setIsConnected(true)
  }, [])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages.length])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('message', inputValue)
    setInputValue('')
  }

  socket.on('message', (msg: string) => {
    setMessages([...messages, msg])
  })

  socket.on('get-message', (chats: { message: string }[]) => {
    const initialMessage: string[] = []
    chats.forEach((chat) => initialMessage.push(chat.message))
    setMessages(initialMessage)
  })

  return (
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
      <div className="flex items-center gap-2 py-2">
        <ModeToggle />
        <div className="text-xl font-bold grow">
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
      </div>

      <ScrollArea>
        <div className="h-[78vh] pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'bg-green-200',
                'dark:bg-green-800',
                'w-fit',
                'my-2',
                'py-2',
                'px-4',
                'rounded-xl',
                'rounded-bl-none',
                'max-w-[90vw]',
                'md:max-w-2xl',
                'break-words'
              )}
            >
              {message}
            </div>
          ))}
          <div ref={chatRef}></div>
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 py-2">
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
