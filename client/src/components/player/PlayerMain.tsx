import React, { useEffect } from 'react'
import openSocket from 'socket.io-client'
import config from '../../config'
import { Sound } from '../../types'

export default () => {
  const _playSound = (sound: Sound) => {
    const fixed = `/${sound.path}`
    const audio = new Audio(fixed)
    const volumeLevel = (sound.level / 100)
    audio.volume = 0.75 * volumeLevel
    audio.play()
  }

  const subscribeToSocket = () => {
    const socket = openSocket(config.socketUrl)

    socket.on('EVENT_PLAYER', (sound: Sound) => _playSound(sound))
  }

  useEffect(() => {
    subscribeToSocket()
  }, [])

  return (
    <div />
  )
}
