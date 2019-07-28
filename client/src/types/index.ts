export type AccessLevel = 'ALL' | 'VIP' | 'MOD' | 'SUB'

export interface Sound {
  id: string,
  access: AccessLevel,
  command: string,
  path: string
}

export interface NewSound {
  access: AccessLevel,
  command: string,
  file: File
}

export interface TwitchUser {
  username: string | null,
  oauth: string | null,
  channels: string[] | null
}

export interface Config {
  socketUrl: string
}
