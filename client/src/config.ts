import { Config } from './types'

const { hostname, protocol } = window.location
const socketPort = 8081

const config: Config = {
  socketUrl: `${protocol}//${hostname}:${socketPort}/socket`
}

export default config
