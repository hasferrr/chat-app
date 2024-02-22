import axios from 'axios'
import { ICredentials, ILoggedIn } from '@/interfaces/interfaces'

const baseUrl = import.meta.env.VITE_SOCKET_SERVER_URL

// Abstract function for register and login
const authentication = async (endpoint: string, credentials: ICredentials) => {
  const response = await axios.post(`${baseUrl}/${endpoint}`, credentials)
  return response.data
}

const register = (credentials: ICredentials): Promise<ILoggedIn> =>
  authentication('register', credentials)

const login = (credentials: ICredentials): Promise<ILoggedIn> =>
  authentication('login', credentials)

export default {
  register,
  login,
}
