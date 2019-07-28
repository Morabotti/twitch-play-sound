import React, { useEffect } from 'react'
import openSocket from 'socket.io-client'
import config from '../../config'

export default () => {
  const _playSound = (url: string) => {
    console.log(url)
    const fixed = `/${url}`
    const audio = new Audio(fixed)
    audio.volume = 0.5
    audio.play()
  }

  const subscribeToSocket = () => {
    const socket = openSocket(config.socketUrl)

    socket.on('EVENT_PLAYER', (path: string) => _playSound(path))
  }

  useEffect(() => {
    subscribeToSocket()
  }, [])

  return (
    <div />
  )
}
