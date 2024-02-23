import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { cn } from '@/lib/utils'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { ICredentials, IUser } from '@/types/interfaces'

import { useSetUser } from '@/context/userContext'
import { useConnect, useDisconnect } from '@/context/connectContext'

/**
 * Abstract function component for Register and Login
 */
const AuthForm = ({
  title,
  submitHandler,
}: {
  title: 'Register' | 'Login'
  submitHandler: (credentials: ICredentials) => Promise<IUser>
}) => {
  const navigate = useNavigate()
  const setUser = useSetUser()
  const connect = useConnect()
  const disconnect = useDisconnect()

  const formSchema = z.object({
    username: z.string().min(3, {
      message: 'Username must be at least 3 characters.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let result
    try {
      result = await submitHandler({
        username: values.username,
        password: values.password,
      })
    } catch (error: any) {
      if (error.response.status === 409) {
        return alert('username is already taken')
      }
      alert('invalid username or password')
      return
    }
    setUser(result)
    disconnect()
    connect()
    navigate('/')
  }

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'justify-center',
        'h-screen',
        'max-w-sm',
        'mx-auto',
        'px-8',
        'gap-4'
      )}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="hasferrr"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Type your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Type your strong password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Submit</Button>
            <div className="grow"></div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>
        </form>
      </Form>
      <Button
        variant="link-small"
        className="mx-auto mt-3 p-0"
        onClick={() =>
          title === 'Login' ? navigate('/register') : navigate('/login')
        }
      >
        {title === 'Login'
          ? "Don't have an account? Register here."
          : 'Click here to login instead.'}
      </Button>
    </div>
  )
}

export default AuthForm
