export type AccessLevel = 'ALL' | 'VIP' | 'MOD' | 'SUB'
export type UserFlags = 'ban' | 'all-access'

export interface Sound {
  id: string,
  access: AccessLevel,
  command: string,
  path: string,
  level: number
}

export interface NewSound {
  access: AccessLevel,
  command: string,
  file: File,
  level: number
}

export interface NewSoundNoUpload {
  access: AccessLevel,
  command: string,
  level: number
}

export interface EditSound {
  id: string,
  access: AccessLevel,
  command: string,
  file: File | null,
  path: string,
  level: number
}

export interface TwitchUser {
  username: string | null,
  oauth: string | null,
  channels: string[] | null
}

export interface User {
  id: string,
  username: string,
  flags: UserFlags[]
}

export interface NewUser {
  username: string,
  flags: UserFlags[]
}

export interface Config {
  socketUrl: string
}
