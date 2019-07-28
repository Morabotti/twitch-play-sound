import React from 'react'
import { TwitchUser } from '../../types'
import {
  Typography as T,
  makeStyles,
  createStyles,
  Theme,
  Button
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      marginTop: theme.spacing(2)
    }
  })
)

interface Props {
  user: TwitchUser,
  onLogOut: () => void
}

export default ({
  user,
  onLogOut
}: Props) => {
  const classes = useStyles()

  return (
    <>
      <T variant='h4'>{user.username}</T>
      <Button
        variant='contained'
        color='secondary'
        className={classes.text}
        onClick={onLogOut}
      >
        Change user
      </Button>
    </>
  )
}
