import * as multer from 'multer'
import * as uuid from 'uuid/v5'

import config from './config'

import { Request } from 'express'
import { getFileExtension } from './utils'

const soundStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data/sounds/')
  },
  filename: function (req: Request, file, cb) {
    const command = req.body.command
    const filename = uuid(command, config.uuidNameSpace)
    switch (getFileExtension(file.originalname)) {
      case 'mp3':
        cb(null, `${filename}.mp3`)
        break
      default:
        cb(null, `${filename}`)
    }
  }
})

const soundFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

export default multer({
  storage: soundStorage,
  fileFilter: soundFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
})
