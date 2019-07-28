import { useState, useEffect } from 'react'
import openSocket from 'socket.io-client'
import { TwitchUser } from '../types'
import config from '../config'

import * as client from '../client'

interface UserContext {
  user: TwitchUser,
  loading: boolean,
  auth: boolean,
  addUser: (user: TwitchUser) => void,
  logOut: () => void
}

const getInitialState = (): TwitchUser => ({
  username: null,
  oauth: null,
  channels: null
})

export const useUser = (): UserContext => {
  const [user, setUser] = useState<TwitchUser>(getInitialState)
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)

  const getUser = () => client.fetchUser()
    .then(u => {
      setUser(u)
      setLoading(false)
    })

  const subscribeToSocket = () => {
    const socket = openSocket(config.socketUrl)

    socket.on('UPDATE_TWITCH', (
      auth: boolean
    ) => setAuth(auth))
  }

  const checkAuth = () => client.checkAuth()
    .then(setAuth)

  const addUser = (user: TwitchUser) => client.addUser(user)
    .then(u => {
      setUser(u)
    })

  const logOut = () => client.logOut()
    .then(() => {
      setUser(getInitialState)
    })

  useEffect(() => {
    getUser()
    subscribeToSocket()
    checkAuth()
  }, [])

  return {
    user,
    loading,
    auth,
    addUser,
    logOut
  }
}
