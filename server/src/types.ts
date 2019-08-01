export type AccessLevel = 'ALL' | 'VIP' | 'MOD' | 'SUB'
export type UserFlags = 'ban' | 'all-access'

export interface Sound {
  id: string,
  access: AccessLevel,
  command: string,
  path: string,
  level: number
}

export interface SoundRequest {
  access: AccessLevel,
  command: string,
  path: string,
  level: number
}

export interface TwitchConfig {
  username: string | null,
  oauth: string | null,
  channels: string[] | null
}

export interface User {
  id: string,
  username: string,
  flags: UserFlags[]
}

export interface UserRequest {
  username: string,
  flags: UserFlags[]
}
