import { Sound } from './types'

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
