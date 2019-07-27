import * as express from 'express'
import * as path from 'path'

import {
  Request,
  Response,
  Application
} from 'express'

import EndPoints from './endpoints'

const app: Application = express()

app.use(express.json())
app.use(express.static('../client/build'))

app.use('/api', EndPoints)

app.use('/static', express.static(path.join(__dirname, '../static')))

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
})

export default app