import { useEffect, useRef, useState } from 'react'

import Chat from './Chat/Chat'
import { useChats } from '@/context/chatsContext'

const Chats = () => {
  const chats = useChats()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = chatContainer
        setIsAtBottom(scrollHeight - scrollTop === clientHeight)
      }

      chatContainer.addEventListener('scroll', handleScroll)

      return () => {
        chatContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (chatContainer && isAtBottom) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [chats.length, isAtBottom])

  return (
    <div
      className="h-[78vh] pr-4 overflow-y-scroll"
      ref={chatContainerRef}
    >
      {chats.map((chat, index) => (
        <Chat
          key={index}
          chat={chat}
        />
      ))}
    </div>
  )
}

export default Chats
