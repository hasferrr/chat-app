import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

const AuthForm = ({
  title,
  submitHandler,
}: {
  title: string
  submitHandler: () => void
}) => {
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
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitHandler() // TODO: pass the `values` to the handler parameter
    console.log(values)
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
          <div className="flex flex-wrap">
            <Button type="submit">Submit</Button>
            <div className="grow"></div>
            <ModeToggle />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AuthForm