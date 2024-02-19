import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'

const App = () => {
  return (
    <div
      className={cn(
        'container',
        'mx-auto',
        'px-4',
        'h-screen',
        'bg-white',
        'dark:bg-[#36393E]'
      )}
    >
      <p>Hello react</p>
      <div>
        <Button>this is button</Button>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  )
}

export default App
