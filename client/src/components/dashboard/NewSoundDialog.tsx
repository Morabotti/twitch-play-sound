import React, { useState } from 'react'

import { AccessLevel, NewSound } from '../../types'
import accessLevel from '../../enums/accessLevels'
import { customColors } from '../../theme'

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
  Theme
} from '@material-ui/core'

import {
  FileUploadOutline
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
    }
  })
)

interface Props {
  isOpen: boolean,
  onClose: () => void,
  onAdd: (sound: NewSound) => Promise<void>
}

interface State {
  access: AccessLevel,
  command: string,
  file: File | null,
  error: boolean
}

const getInitialState = (): State => ({
  access: 'ALL',
  command: '',
  file: null,
  error: false
})

export default ({
  isOpen,
  onClose,
  onAdd
}: Props) => {
  const classes = useStyles()
  const [state, setState] = useState<State>(getInitialState)

  const _handleClose = () => {
    onClose()
    setState(getInitialState)
  }

  const _handleUpload = () => {
    if (state.file !== null && state.command !== '') {
      onAdd({
        access: state.access,
        command: state.command,
        file: state.file
      })
        .then(() => {
          onClose()
          setState(getInitialState)
        })
        .catch(() => {
          setState({
            ...state,
            error: true
          })
        })
    }
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
          value={state.command}
          onChange={e => setState({
            ...state,
            command: e.currentTarget.value
          })}
          fullWidth
          error={state.error}
          variant='outlined'
          className={classes.text}
        />
        <FormControl variant='outlined' fullWidth>
          <InputLabel htmlFor='select-access-level'>
            Select Access Level
          </InputLabel>
          <Select
            value={state.access}
            onChange={(e: any) => setState({
              ...state,
              access: e.target.value
            })}
            fullWidth
            error={state.error}
            input={
              <OutlinedInput
                fullWidth
                labelWidth={123}
                value={state.access}
                name='type'
                error={state.error}
                id='select-access-level'
              />
            }
          >
            {accessLevel.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          className={classes.input}
          id='sound-file-button'
          type='file'
          onChange={e => setState({
            ...state,
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
            Upload Sound
            <FileUploadOutline className={classes.icon} />
            {state.file !== null && (
              ` (${state.file.name})`
            )}
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleClose} color='secondary'>
          Close
        </Button>
        {state.file !== null && state.command !== '' && (
          <Button onClick={_handleUpload} color='primary'>
            Add
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
