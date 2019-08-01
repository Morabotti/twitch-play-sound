import React, { Dispatch, SetStateAction, Fragment } from 'react'

import { EditSound } from '../../../types'
import accessLevel from '../../../enums/accessLevels'
import { customColors } from '../../../theme'
import { IconHelper } from '../'

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  createStyles,
  makeStyles,
  Theme,
  Typography as T,
  Grid,
  Input,
  Slider,
  IconButton,
  Tooltip
} from '@material-ui/core'

import {
  FileUploadOutline,
  VolumeHigh,
  Play
} from 'mdi-material-ui'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      margin: theme.spacing(2, 0)
    },
    error: {
      color: customColors.danger.main
    },
    input: {
      display: 'none'
    },
    icon: {
      marginLeft: theme.spacing(1)
    },
    replay: {
      marginRight: theme.spacing(2)
    },
    menuitem: {
      verticalAlign: 'middle'
    },
    menuItemText: {
      display: 'inline-flex',
      verticalAlign: 'super',
      fontWeight: 400,
      marginLeft: theme.spacing(1)
    }
  })
)

interface Props {
  isOpen: boolean,
  onClose: () => void,
  onEdit: (sound: EditSound) => Promise<void>,
  sound: EditSound | null,
  setSound: Dispatch<SetStateAction<EditSound | null>>
}

export default ({
  isOpen,
  onClose,
  onEdit,
  sound,
  setSound
}: Props) => {
  const classes = useStyles()

  const _handleClose = () => {
    onClose()
  }

  const _handleUpload = () => {
    if (sound !== null && sound.command !== '') {
      onEdit({
        id: sound.id,
        access: sound.access,
        command: sound.command,
        file: sound.file,
        level: Number(sound.level),
        path: sound.path
      })
        .then(() => {
          onClose()
        })
        .catch(() => {
          setSound(null)
        })
    }
  }

  const handleBlur = () => {
    if (sound && sound.level < 0) {
      setSound({ ...sound, level: 0 })
    }
    else if (sound && sound.level > 100) {
      setSound({ ...sound, level: 100 })
    }
  }

  const _playSound = () => {
    if ((sound && sound.file) || (sound && sound.path)) {
      const audio = new Audio(sound.file !== null
        ? window.URL.createObjectURL(sound.file)
        : '/' + sound.path)

      const volumeLevel = (Number(sound.level) / 100)
      audio.volume = 0.75 * volumeLevel
      audio.play()
    }
  }

  if (sound === null) {
    return <Fragment />
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={isOpen}
      onClose={_handleClose}
      aria-labelledby='active-dialog-title'
    >
      <DialogTitle id='active-dialog-title'>Add new sound</DialogTitle>
      <DialogContent>
        <TextField
          label='Command'
          value={sound.command}
          onChange={e => setSound({
            ...sound,
            command: e.currentTarget.value
          })}
          fullWidth
          variant='outlined'
          className={classes.text}
        />
        <FormControl variant='outlined' fullWidth>
          <InputLabel htmlFor='select-access-level'>
            Select Access Level
          </InputLabel>
          <Select
            value={sound.access}
            onChange={(e: any) => setSound({
              ...sound,
              access: e.target.value
            })}
            fullWidth
            input={
              <OutlinedInput
                fullWidth
                labelWidth={123}
                value={sound.access}
                name='type'
                id='select-access-level'
              />
            }
          >
            {accessLevel.map(s => (
              <MenuItem key={s} value={s} className={classes.menuitem}>
                <IconHelper access={s} /> <T variant='h4' className={classes.menuItemText}>{s}</T>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          className={classes.input}
          id='sound-file-button'
          type='file'
          onChange={e => setSound({
            ...sound,
            file: e.target.files && e.target.files[0]
              ? e.target.files[0]
              : null
          })}
        />
        <label htmlFor='sound-file-button'>
          <Button
            variant='contained'
            component='span'
            color='default'
            fullWidth
            className={classes.text}
          >
            {sound.file === null ? 'Upload New Sound' : 'New Sound' }
            <FileUploadOutline className={classes.icon} />
            {sound.file !== null && (
              ` (${sound.file.name})`
            )}
          </Button>
        </label>
        <div>
          <T id='input-slider' gutterBottom>
            Volume
          </T>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <VolumeHigh />
            </Grid>
            <Grid item xs>
              <Slider
                value={typeof sound.level === 'number' ? sound.level : 0}
                onChange={(e, v) => {
                  if (sound && sound.level !== v) {
                    setSound({ ...sound, level: Number(v) })
                  }
                }}
                step={5}
                aria-labelledby='input-slider'
              />
            </Grid>
            <Grid item>
              <Input
                className={classes.input}
                value={sound.level}
                margin='dense'
                onChange={e => setSound({ ...sound, level: Number(e.target.value) })}
                onBlur={handleBlur}
                inputProps={{
                  step: 10,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider'
                }}
              />
            </Grid>
            <Grid item className={classes.replay}>
              <Tooltip placement='top' title='Test Sound Level'>
                <IconButton color='primary' onClick={_playSound}>
                  <Play />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleClose} color='secondary'>
          Close
        </Button>
        {sound.command !== '' && (
          <Button onClick={_handleUpload} color='primary'>
            Add
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
