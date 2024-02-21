import { useEffect, useRef, useState } from 'react'

import { ModeToggle } from '@/components/mode-toggle'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

import { socket } from './socket'
import { epochTimeToStringDate } from './helpers'

interface Chat {
  author: string
  message: string
  epochTime: number
}

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [chats, setChats] = useState<Chat[]>([])
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
  }, [chats.length])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('message', inputValue)
    setInputValue('')
  }

  socket.on('message', (chat: Chat) => {
    setChats([...chats, chat])
  })

  socket.on('get-message', (chats: Chat[]) => {
    setChats(
      chats.map((chat) => ({
        author: chat.author,
        message: chat.message,
        epochTime: chat.epochTime,
      }))
    )
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
          {chats.map((chat, index) => (
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
              <div>
                <span className="font-semibold">{chat.author}</span>
                <span> </span>
                <span className="opacity-60 text-sm">
                  {epochTimeToStringDate(chat.epochTime)}
                </span>
              </div>
              <div>{chat.message}</div>
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
