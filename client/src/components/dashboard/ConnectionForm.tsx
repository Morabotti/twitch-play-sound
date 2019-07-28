import React, { useState } from 'react'
import { customColors } from '../../theme'
import { Eye, EyeOff } from 'mdi-material-ui'
import { TwitchUser } from '../../types'

import {
  createStyles,
  Theme,
  makeStyles,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Typography as T
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      marginTop: theme.spacing(2)
    },
    error: {
      color: customColors.danger.main
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.secondary.light,
      fontWeight: 700
    }
  })
)

interface Props {
  onAuth: (user: TwitchUser) => void
}

interface State {
  username: string,
  oauth: string,
  error: boolean,
  showKey: boolean
}

const getInitialState = (): State => ({
  username: '',
  oauth: '',
  error: false,
  showKey: false
})

export default ({
  onAuth
}: Props) => {
  const [state, setState] = useState<State>(getInitialState)
  const classes = useStyles()

  const handleSubmit = () => {
    onAuth({
      username: state.username,
      oauth: state.oauth,
      channels: [state.username]
    })
    setState(getInitialState)
  }

  return (
    <>
      <TextField
        label='Twitch Username'
        value={state.username}
        onChange={e => setState({
          ...state,
          username: e.currentTarget.value
        })}
        fullWidth
        error={state.error}
        className={classes.text}
      />
      <FormControl className={classes.text} fullWidth>
        <InputLabel htmlFor='adornment-oauth'>OAuth key</InputLabel>
        <Input
          id='adornment-oauth'
          type={state.showKey ? 'text' : 'password'}
          value={state.oauth}
          fullWidth
          onChange={e => setState({
            ...state,
            oauth: e.currentTarget.value
          })}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setState({
                  ...state,
                  showKey: !state.showKey
                })}
              >
                {state.showKey ? <Eye /> : <EyeOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <T
        variant='body2'
      >Get OAauth key: <a href='https://twitchapps.com/tmi/' className={classes.link} target='_blank'>Here</a>
      </T>
      <Button
        variant='contained'
        color='secondary'
        disabled={state.username === '' || state.oauth === ''}
        className={classes.text}
        onClick={handleSubmit}
      >
        Authenticate
      </Button>
    </>
  )
}
