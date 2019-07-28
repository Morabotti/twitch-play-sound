import React, { useState } from 'react'
import { Layout } from '.'
import { Refresh } from 'mdi-material-ui'

import {
  createStyles,
  Theme,
  makeStyles,
  Button,
  TextField
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1, 2, 0, 0)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    actionContainer: {
      marginBottom: theme.spacing(2)
    },
    url: {
      textDecoration: 'none'
    }
  })
)

export default () => {
  const [isDisabled, setDisabled] = useState(false)
  const classes = useStyles()

  return (
    <>
      <Layout title='Home'>
        <div>...</div>
      </Layout>
      <Layout title='Twitch browser source'>
        <div className={classes.actionContainer}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={() => setDisabled(!isDisabled)}
          >
            {isDisabled ? 'Disabled' : 'Enabled'}
          </Button>
          <Button variant='contained' color='secondary' className={classes.button}>
            Refresh
            <Refresh className={classes.rightIcon} />
          </Button>
          <a
            className={classes.url}
            href={`${window.location.origin}/player`}
            target='_blank'
          >
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
            >
              Open player
            </Button>
          </a>
        </div>
        <TextField
          required
          autoFocus
          disabled
          margin='dense'
          label='Browser source'
          variant='outlined'
          type='text'
          value={`${window.location.origin}/player`}
          fullWidth
        />
      </Layout>
    </>
  )
}
