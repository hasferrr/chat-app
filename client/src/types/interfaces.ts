import { User } from '@/context/userContext'
import { Chat } from '@/context/chatsContext'

export type IChat = Chat

export interface ICredentials {
  username: string
  password: string
}

export type IUser = Exclude<User, null>
