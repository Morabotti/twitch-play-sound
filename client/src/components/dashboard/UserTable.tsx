import React from 'react'
import clsx from 'clsx'

import {
  User
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
  Tooltip,
  Typography as T
} from '@material-ui/core'

import { DeleteOutline, Pencil } from 'mdi-material-ui'

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
    },
    accessText: {
      display: 'inline-flex',
      verticalAlign: 'super',
      marginLeft: theme.spacing(1.5)
    }
  })
)

interface Props {
  users: User[],
  loading: boolean,
  onDelete: (id: string) => void,
  onEdit: (user: User) => void
}

export default ({
  users,
  loading,
  onDelete,
  onEdit
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
          <TableCell>Username</TableCell>
          <TableCell>Permissions</TableCell>
          <TableCell align='right'>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow
            key={user.id}
            className='contains-inv-actions'
          >
            <TableCell component='th' scope='row'>
              {user.username}
            </TableCell>
            <TableCell>
              {user.flags.map(i => <T key={i}>{i} </T>)}
            </TableCell>
            <TableCell align='right'>
              <div className='inv-actions' style={{ float: 'right' }}>
                <Tooltip placement='top' title='Edit user'>
                  <IconButton
                    className={clsx(classes.small, classes.iconOffset)}
                    onClick={() => onEdit(user)}
                  >
                    <Pencil />
                  </IconButton>
                </Tooltip>
                <Tooltip placement='top' title='Delete user'>
                  <IconButton
                    className={classes.small}
                    onClick={() => onDelete(user.id)}
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
