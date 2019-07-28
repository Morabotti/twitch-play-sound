
import * as bodyParser from 'body-parser'

import { Request, Response, Router } from 'express'
import soundUpload from './soundupload'
import { fetchSounds, addSound, deleteSound } from './datastore'

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/sounds', soundUpload.single('sound'), async (req: Request, res: Response) => {
  try {
    const { access, command } = req.body
    const newSong = await addSound({
      access,
      command,
      path: req.file.path
    })

    return res.status(200).send(newSong)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.get('/sounds', async (req: Request, res: Response) => {
  try {
    const sounds = await fetchSounds()
    return res.status(200).send(sounds)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.delete('/sounds/:id', async (req: Request, res: Response) => {
  try {
    const sounds = await deleteSound(req.params.id)
    return res.status(200).send(sounds)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

export default router
