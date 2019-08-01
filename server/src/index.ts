import * as express from 'express'
import * as path from 'path'

import {
  Request,
  Response,
  Application
} from 'express'

import EndPoints from './endpoints'
import config from './config'
import { migrateSoundDatabase } from './datastore'
import { migrateUserDatabase } from './users'
import twitchConnection from './twitch'

const app: Application = express()

app.use(express.json())
app.use(express.static('../client/build'))

app.use('/api', EndPoints)

app.use('/data', express.static(path.join(__dirname, '../data')))

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
})

app.listen(config.port, async () => {
  await migrateSoundDatabase()
  await migrateUserDatabase()
  await twitchConnection.onStartConnect()
  console.log(`Server listening on port ${config.port}`)
})
