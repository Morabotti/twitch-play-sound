    
import * as bodyParser from 'body-parser'

import { Request, Response, Router } from 'express'

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/sounds', (req: Request, res: Response) => {
  return res
    .status(200)
    .send([])
})

export default router