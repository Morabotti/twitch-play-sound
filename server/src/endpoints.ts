
import * as bodyParser from 'body-parser'

import { Request, Response, Router } from 'express'
import { fetchSounds, addSound, deleteSound, updateSound, findSoundById } from './datastore'
import { SoundRequest } from './types'

import soundUpload from './soundupload'
import twitchConnection from './twitch'

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/sounds', soundUpload.single('sound'), async (req: Request, res: Response) => {
  try {
    const { access, command, level } = req.body
    const newSong = await addSound({
      access,
      command,
      path: req.file.path,
      level: Number(level)
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

router.put('/sounds/:id/upload', soundUpload.single('sound'), async (req: Request, res: Response) => {
  try {
    const { access, command, level } = req.body
    const updated: SoundRequest = {
      access,
      command,
      path: req.file.path,
      level: Number(level)
    }

    const sound = await updateSound(req.params.id, updated, true)
    return res.status(200).send(sound)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.put('/sounds/:id/standard', async (req: Request, res: Response) => {
  try {
    const { access, command, level } = req.body
    const oldSound = await findSoundById(req.params.id)

    const updated: SoundRequest = {
      access,
      command,
      path: oldSound.path,
      level: Number(level)
    }

    const sound = await updateSound(req.params.id, updated, false)
    return res.status(200).send(sound)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.get('/twitch/auth', async (req: Request, res: Response) => {
  const auth = await twitchConnection.isAuth()
  return res.status(200).send(auth)
})

router.post('/twitch/logout', async (req: Request, res: Response) => {
  const auth = await twitchConnection.disconnect()
  return res.status(200).send(auth)
})

router.get('/twitch', (req: Request, res: Response) => {
  try {
    const config = twitchConnection.getConfig()
    return res.status(200).send(config)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.post('/twitch', async (req: Request, res: Response) => {
  try {
    const config = await twitchConnection.updateConfig({
      username: req.body.username,
      oauth: req.body.oauth,
      channels: req.body.channels
    })
    return res.status(200).send(config)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

export default router
