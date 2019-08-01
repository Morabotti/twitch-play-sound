import { useState, useEffect } from 'react'
import { User, NewUser } from '../types'

import * as client from '../client'

interface UserContext {
  users: User[],
  loading: boolean,
  addUser: (set: NewUser) => Promise<void>,
  editUser: (set: User) => Promise<void>,
  deleteUser: (id: string) => Promise<void>
}

export const useUsers = (): UserContext => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const getUsers = () => client.fetchUsers()
    .then(users => {
      setUsers(users)
      setLoading(false)
    })

  const addUser = (
    user: NewUser
  ): Promise<void> => client.addUsers(user)
    .then(s => setUsers([ ...users, s ]))

  const deleteUser = (id: string) => client.deleteUsers(id)
    .then(users => setUsers(users))

  const editUser = (user: User) => client.editUser(user.id, user)
    .then(u => setUsers(users.map(i => i.id === u.id ? u : i)))

  useEffect(() => {
    getUsers()
  }, [])

  return {
    users,
    loading,
    addUser,
    editUser,
    deleteUser
  }
}
