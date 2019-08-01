import React, { useState } from 'react'

import { UserFlags, NewUser } from '../../../types'
import userFlags from '../../../enums/userFlags'
import { customColors } from '../../../theme'

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  createStyles,
  makeStyles,
  Theme,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Chip
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      margin: theme.spacing(2, 0),
      width: '100%'
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
    },
    chip: {
      margin: theme.spacing(0, 0.5),
      cursor: 'pointer'
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
      cursor: 'pointer'
    }
  })
)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

interface Props {
  isOpen: boolean,
  onClose: () => void,
  onAdd: (sound: NewUser) => Promise<void>
}

interface State {
  flags: UserFlags[],
  username: string,
  error: boolean
}

const getInitialState = (): State => ({
  username: '',
  flags: [],
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

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setState({
      ...state,
      flags: e.target.value as UserFlags[]
    })
  }

  const _handleNewUser = () => {
    if (state.username !== '') {
      onAdd({
        username: state.username,
        flags: state.flags
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
      <DialogTitle id='active-dialog-title'>Add new user</DialogTitle>
      <DialogContent>
        <TextField
          label='Twitch Username'
          value={state.username}
          onChange={e => setState({
            ...state,
            username: e.currentTarget.value
          })}
          fullWidth
          error={state.error}
          variant='outlined'
          className={classes.text}
        />
        <FormControl className={classes.text}>
          <InputLabel htmlFor='select-multiple-chip'>Chip</InputLabel>
          <Select
            multiple
            value={state.flags}
            onChange={handleChange}
            input={<Input id='select-multiple-chip' />}
            fullWidth
            renderValue={selected => (
              <div className={classes.chips}>
                {(selected as string[]).map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {userFlags.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleClose} color='secondary'>
          Close
        </Button>
        {state.username !== '' && (
          <Button onClick={_handleNewUser} color='primary'>
            Add
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
