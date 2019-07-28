import React from 'react'

import {
  Typography as T,
  Paper,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionHeader: {
      margin: theme.spacing(1, 0, 0.5)
    },
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
)

interface Props {
  title: string,
  children: JSX.Element | JSX.Element[]
}

export default ({ title, children }: Props) => {
  const classes = useStyles()

  return (
    <Paper elevation={1} className={classes.paper}>
      <T variant='h3'>{title}</T>
      {children}
    </Paper>
  )
}
