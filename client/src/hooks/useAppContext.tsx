import React, {
  useContext,
  useEffect,
  useState,
  ReactNode,
  createContext
} from 'react'

import * as client from '../client'
import openSocket from 'socket.io-client'
import { TwitchUser } from '../types'
import config from '../config'

interface Context {
  user: null | TwitchUser,
  update: () => void,
  logout: () => void,
  login: (user: TwitchUser) => void,
  auth: boolean
}

export const __AppContext = createContext<Context>({
  user: null,
  update: () => {},
  logout: () => {},
  login: () => {},
  auth: false
})

interface Props {
  children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TwitchUser | null>(null)
  const [auth, setAuth] = useState(false)

  const subscribeToSocket = () => {
    const socket = openSocket(config.socketUrl)

    socket.on('UPDATE_TWITCH', (
      auth: boolean
    ) => setAuth(auth))
  }

  const checkAuth = () => client.checkAuth()
    .then(setAuth)

  const update = () => {
    client.fetchUser()
      .then(user => setUser(user))
    subscribeToSocket()
    checkAuth()
  }

  const login = (newUser: TwitchUser) => {
    client.addUser(newUser)
      .then(() => {
        setUser(newUser)
        setAuth(true)
      })
  }

  const logout = () => client.logOut()
    .then(() => setUser(null))

  useEffect(update, [])

  return (
    <__AppContext.Provider
      value={{
        user,
        update,
        login,
        logout,
        auth
      }}>
      {children}
    </__AppContext.Provider>
  )
}

export const useAppContext = (): Context => useContext(__AppContext)
