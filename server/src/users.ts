import * as jsonfile from 'jsonfile'
import * as uuid from 'uuid/v5'

import config from './config'

import { User, UserRequest } from './types'

const fileUsers = './db/db-users.json'

const readUsers = (): Promise<User[]> => new Promise((resolve, reject) => {
  jsonfile.readFile(fileUsers, (err, mainObj: User[]) => {
    if (err) reject(err)
    resolve(mainObj)
  })
})

const setUsers = (
  data: User[]
) => new Promise((resolve, reject) => {
  jsonfile.writeFile(fileUsers, data, (err) => {
    if (err) reject(err)
    resolve()
  })
})

export const isUserTaken = async (
  username: string
): Promise<boolean> => {
  if (username === '') {
    throw new Error('Given command is empty')
  }

  const users = await readUsers()
  const found = users.find(s => s.username === username)
  return found === undefined
}

export const findUserById = async (
  id: string
) => {
  if (id === '') {
    throw new Error('Given ID is empty')
  }
  const users = await readUsers()
  const found = users.find(s => s.id === id)
  if (!found) {
    throw new Error('User was not found')
  }
  return found
}

export const addUser = async (
  user: UserRequest
): Promise<User> => {
  try {
    const isFree = await isUserTaken(user.username)
    if (isFree) {
      const users = await readUsers()
      const newUser: User = {
        ...user,
        id: uuid(user.username, config.uuidNameSpace)
      }
      await setUsers([ ...users, newUser ])

      return newUser
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

export const deleteUser = async (
  id: string
): Promise<User[]> => {
  try {
    const oldUser = await findUserById(id)
    const userList = await readUsers()

    const updated = userList.filter(l => l.id !== oldUser.id)
    await setUsers(updated)

    return updated
  }
  catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const updateUser = async (
  id: string,
  user: User
): Promise<User> => {
  try {
    const oldUser = await findUserById(id)
    const userList = await readUsers()

    const isFree = await isUserTaken(user.username)

    if (oldUser.username !== user.username && !isFree) {
      throw new Error('This command is already taken')
    }

    const newUser: User = {
      id: oldUser.id,
      ...user
    }

    const updated = userList.map(l => l.id === newUser.id ? newUser : l)
    await setUsers(updated)

    return newUser
  }
  catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const findUser = async (
  username: string | undefined
): Promise<null | User> => {
  if (username === undefined) {
    return null
  }

  const users = await readUsers()
  const found = users.find(s => s.username.toLowerCase() === username.toLowerCase())
  if (!found) {
    return null
  }

  return found
}

export const fetchUsers = async (): Promise<User[]> => readUsers()
export const migrateUserDB = async () => setUsers([])

export const migrateUserDatabase = async () => {
  try {
    await fetchUsers()
  }
  catch (e) {
    console.log('Migrating user DB')
    await migrateUserDB()
  }
}
