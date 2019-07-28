import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  uuidNameSpace: string
}

const config: ConfigType = {
  port: Number(process.env.SERVER_PORT) || 8080,
  uuidNameSpace: process.env.UUID_NAMESPACE || '00 02 32 ef 70 30 a8 ea e4 c5 21 69 95 da 8a c5'
}

export default config
