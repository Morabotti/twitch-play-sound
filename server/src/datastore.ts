import * as jsonfile from 'jsonfile'
import * as fs from 'fs'
import * as uuid from 'uuid/v5'

import config from './config'

import { Sound, SoundRequest } from './types'
import { deleteFile as deleteUtil } from './utils'

const fileSongs = './db/db-sounds.json'

const readSounds = (): Promise<Sound[]> => new Promise((resolve, reject) => {
  jsonfile.readFile(fileSongs, (err, mainObj: Sound[]) => {
    if (err) reject(err)
    resolve(mainObj)
  })
})

const setSounds = (
  data: Sound[]
) => new Promise((resolve, reject) => {
  jsonfile.writeFile(fileSongs, data, (err) => {
    if (err) reject(err)
    resolve()
  })
})

export const deleteFile = (
  path: string
): Promise<void> => new Promise((resolve, reject) => {
  try {
    resolve(fs.unlinkSync(path))
  }
  catch (err) {
    console.log(err)
    reject(err)
  }
})

export const isCommandFree = async (
  command: string
): Promise<boolean> => {
  if (command === '' || command === '!') {
    throw new Error('Given command is empty')
  }
  const songs = await readSounds()
  const found = songs.find(s => s.command === command)
  return found === undefined
}

export const findSoundById = async (
  id: string
) => {
  if (id === '') {
    throw new Error('Given ID is empty')
  }
  const songs = await readSounds()
  const found = songs.find(s => s.id === id)
  if (!found) {
    throw new Error('Sound was not found')
  }
  return found
}

export const addSound = async (
  sound: SoundRequest
): Promise<Sound> => {
  try {
    const isFree = await isCommandFree(sound.command)
    if (isFree) {
      const sounds = await readSounds()
      const newSound: Sound = {
        ...sound,
        id: uuid(sound.command, config.uuidNameSpace)
      }
      await setSounds([ ...sounds, newSound ])

      return newSound
    }
    else {
      throw new Error('Sound command is already taken!')
    }
  }
  catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const updateSound = async (
  id: string,
  sound: SoundRequest,
  hasNewSound: boolean
): Promise<Sound> => {
  try {
    const oldSound = await findSoundById(id)
    const soundList = await readSounds()

    const isFree = await isCommandFree(sound.command)

    if (sound.command !== oldSound.command && !isFree) {
      if (hasNewSound) {
        deleteUtil(sound.path)
      }
      throw new Error('This command is already taken')
    }
    else {
      if (hasNewSound) {
        deleteUtil(oldSound.path)
      }
    }

    const newSound: Sound = {
      id: oldSound.id,
      ...sound
    }

    const updated = soundList.map(l => l.id === newSound.id ? newSound : l)
    await setSounds(updated)

    return newSound
  }
  catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const deleteSound = async (
  id: string
): Promise<Sound[]> => {
  try {
    const oldSound = await findSoundById(id)
    const soundList = await readSounds()

    await deleteFile(oldSound.path)
    const updated = soundList.filter(l => l.id !== oldSound.id)
    await setSounds(updated)

    return updated
  }
  catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const fetchSounds = async (): Promise<Sound[]> => readSounds()
export const migrateSoundDB = async () => setSounds([])

export const migrateSoundDatabase = async () => {
  try {
    await fetchSounds()
  }
  catch (e) {
    console.log('Migrating sound DB')
    await migrateSoundDB()
  }
}
