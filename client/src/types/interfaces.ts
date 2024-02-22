import { User } from '@/context/userContext'

export interface IChat {
  author: string
  message: string
  epochTime: number
}

export interface ICredentials {
  username: string
  password: string
}

export type IUser = Exclude<User, null>
