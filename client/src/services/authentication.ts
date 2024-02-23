import axios from 'axios'
import { ICredentials, IUser } from '@/types/interfaces'

let baseUrl = import.meta.env.VITE_SOCKET_SERVER_URL
baseUrl = baseUrl.charAt(baseUrl.length - 1) === '/'
  ? baseUrl.slice(0, -1)
  : baseUrl

// Abstract function for register and login
const authentication = async (endpoint: string, credentials: ICredentials) => {
  const response = await axios.post(`${baseUrl}/${endpoint}`, credentials)
  return response.data
}

const register = (credentials: ICredentials): Promise<IUser> =>
  authentication('register', credentials)

const login = (credentials: ICredentials): Promise<IUser> =>
  authentication('login', credentials)

export default {
  register,
  login,
}
