import { useState, useEffect } from 'react'
import { Sound, NewSound } from '../types'

import * as client from '../client'

interface SoundContext {
  sounds: Sound[],
  loading: boolean,
  addSound: (sound: NewSound) => void,
  deleteSound: (id: string) => void
}

export const useSounds = (): SoundContext => {
  const [sounds, setSounds] = useState<Sound[]>([])
  const [loading, setLoading] = useState(true)

  const getSounds = () => client.fetchSounds()
    .then(sounds => {
      setSounds(sounds)
      setLoading(false)
    })

  const addSound = (sound: NewSound): Promise<void> => {
    const form = new FormData()
    form.append('access', sound.access)
    form.append('command', sound.command)
    form.append('sound', sound.file)
    return client.addSound(form)
      .then(s => setSounds([...sounds, s]))
  }

  const deleteSound = (id: string) => {
    client.deleteSound(id)
      .then(sounds => setSounds(sounds))
  }

  useEffect(() => {
    getSounds()
  }, [])

  return {
    sounds,
    loading,
    addSound,
    deleteSound
  }
}
