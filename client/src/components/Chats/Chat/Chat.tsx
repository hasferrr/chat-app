import { useUser } from '@/context/userContext'
import { cn } from '@/lib/utils'

import { IChat } from '@/types/interfaces'
import epochToDate from '@/utils/epochToDate'

const Chat = ({ chat }: { chat: IChat }) => {
  const user = useUser()

  return (
    <div
      className={cn(
        'w-full flex flex-col my-2',
        chat.author === user?.username ? 'items-end' : 'items-start'
      )}
    >
      <div
        className={cn(
          'bg-green-200',
          'dark:bg-green-800',
          'w-fit',
          'py-2',
          'px-4',
          'rounded-xl',
          chat.author === user?.username
            ? 'rounded-br-none'
            : 'rounded-bl-none',
          'max-w-[90vw]',
          'md:max-w-2xl',
          'break-words'
        )}
      >
        <div>
          <span className="font-semibold">{chat.author}</span>
          <span> </span>
          <span className="opacity-60 text-sm">
            {epochToDate(chat.epochTime)}
          </span>
        </div>
        <div>{chat.message}</div>
      </div>
    </div>
  )
}

export default Chat
