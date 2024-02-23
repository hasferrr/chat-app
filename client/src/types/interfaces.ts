export interface IChat {
  author: string
  message: string
  epochTime: number
}

export interface ICredentials {
  username: string
  password: string
}

export interface IUser {
  token: string
  username: string
}
