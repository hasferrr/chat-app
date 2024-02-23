import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import socket from '@/utils/socket'
import { useUser } from '@/context/userContext'

const Form = () => {
  const user = useUser()

  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    if (inputValue === '') return
    socket.emit('message', inputValue)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 py-2">
        <Input
          type="text"
          placeholder={user ? 'type a message' : 'please log in first'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!user}
        />
        <Button
          type="submit"
          disabled={!user}
        >
          Send
        </Button>
      </div>
    </form>
  )
}

export default Form
