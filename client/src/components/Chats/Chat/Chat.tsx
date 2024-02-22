import { cn } from '@/lib/utils'

import { IChat } from '@/types/interfaces'
import epochToDate from '@/utils/epochToDate'

const Chat = ({ chat }: { chat: IChat }) => {
  return (
    <div
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
          {epochToDate(chat.epochTime)}
        </span>
      </div>
      <div>{chat.message}</div>
    </div>
  )
}

export default Chat
