export type AccessLevel = 'ALL' | 'VIP' | 'MOD' | 'SUB'

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

export interface TwitchUser {
  username: string | null,
  oauth: string | null,
  channels: string[] | null
}

export interface Config {
  socketUrl: string
}
