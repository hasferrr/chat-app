import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

import { IChat } from '@/App'
import Chat from './Chat/Chat'

const Chats = ({ chats }: { chats: IChat[] }) => {
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [chats.length])

  return (
    <ScrollArea>
      <div className="h-[78vh] pr-4">
        {chats.map((chat, index) => (
          <Chat
            key={index}
            chat={chat}
          />
        ))}
        <div ref={chatRef}></div>
      </div>
    </ScrollArea>
  )
}

export default Chats
