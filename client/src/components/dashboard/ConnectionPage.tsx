import React from 'react'
import { Layout, ConnectionForm, ConnectedCard } from '.'
import { customColors } from '../../theme'
import clsx from 'clsx'
import { useUser } from '../../hooks'

import {
  createStyles,
  makeStyles,
  Theme,
  Chip,
  LinearProgress
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginTop: theme.spacing(1),
      color: theme.palette.common.white
    },
    connected: {
      backgroundColor: customColors.success.main
    },
    disconnected: {
      backgroundColor: customColors.danger.main
    },
    loading: {
      marginTop: theme.spacing(1)
    }
  })
)

export default () => {
  const classes = useStyles()

  const {
    user,
    loading,
    auth,
    addUser,
    logOut
  } = useUser()

  console.log(auth)

  return (
    <>
      <Layout title='Connection Status'>
        <Chip
          label={auth ? 'Connected' : 'Not connected'}
          className={clsx(classes.chip, {
            [classes.connected]: auth,
            [classes.disconnected]: !auth
          })}
        />
      </Layout>
      <Layout title={auth ? 'You are logged in as' : 'Give access to Twitch'}>
        {loading ? (
          <LinearProgress color='secondary' className={classes.loading} />
        ) : !auth ? (
          <ConnectionForm onAuth={addUser} />
        ) : (
          <ConnectedCard user={user} onLogOut={logOut} />
        )}
      </Layout>
    </>
  )
}
