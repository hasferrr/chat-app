import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import socket from '@/utils/socket'

const Form = () => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('message', inputValue)
    setInputValue('')
  }

  return (
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
  )
}

export default Form
