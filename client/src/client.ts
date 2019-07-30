import { Sound, TwitchUser } from './types'

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const fetchSounds = (): Promise<Sound[]> => fetch(
  '/api/sounds',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const checkAuth = (): Promise<boolean> => fetch(
  '/api/twitch/auth',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const addSound = (
  data: FormData
): Promise<Sound> => {
  const options = {
    method: 'POST',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch('/api/sounds', options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const deleteSound = (id: string): Promise<Sound[]> => fetch(
  '/api/sounds/' + id,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchUser = (): Promise<TwitchUser> => fetch(
  '/api/twitch',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const addUser = (
  user: TwitchUser
): Promise<Response> => fetch(
  '/api/twitch',
  {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const logOut = (): Promise<Response> => fetch(
  '/api/twitch/logout',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
