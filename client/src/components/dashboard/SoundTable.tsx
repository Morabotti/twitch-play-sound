import React from 'react'

import {
  Sound
} from '../../types'

import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  createStyles,
  makeStyles,
  Theme,
  LinearProgress,
  IconButton,
  Tooltip
} from '@material-ui/core'

import { DeleteOutline } from 'mdi-material-ui'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
      marginTop: theme.spacing(1)
    },
    loading: {
      marginTop: theme.spacing(1)
    },
    small: {
      padding: theme.spacing(0.75)
    },
    iconOffset: {
      marginRight: theme.spacing(2)
    }
  })
)

interface Props {
  sounds: Sound[],
  loading: boolean,
  onDelete: (id: string) => void
}

export default ({
  sounds,
  loading,
  onDelete
}: Props) => {
  const classes = useStyles()

  if (loading) {
    return (
      <LinearProgress color='secondary' className={classes.loading} />
    )
  }

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Command</TableCell>
          <TableCell>Access</TableCell>
          <TableCell align='right'>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sounds.map(sound => (
          <TableRow
            key={sound.id}
            className='contains-inv-actions'
          >
            <TableCell component='th' scope='row'>
              {sound.command}
            </TableCell>
            <TableCell>{sound.access}</TableCell>
            <TableCell align='right'>
              <div className='inv-actions' style={{ float: 'right' }}>
                <Tooltip placement='top' title='Delete sound'>
                  <IconButton
                    className={classes.small}
                    onClick={() => onDelete(sound.id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
