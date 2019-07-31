import React from 'react'
import { IconHelper } from '.'
import clsx from 'clsx'

import {
  Sound,
  EditSound
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

import { DeleteOutline, Play, Pencil } from 'mdi-material-ui'

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
  sounds: Sound[],
  loading: boolean,
  onDelete: (id: string) => void,
  onEdit: (sound: EditSound | null) => void
}

export default ({
  sounds,
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

  const _playSound = (sound: Sound) => () => {
    const fixed = `/${sound.path}`
    const audio = new Audio(fixed)
    const volumeLevel = (sound.level / 100)
    audio.volume = 0.75 * volumeLevel
    audio.play()
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
            <TableCell>
              <IconHelper access={sound.access} />
              <T className={classes.accessText}>{sound.access}</T>
            </TableCell>
            <TableCell align='right'>
              <div className='inv-actions' style={{ float: 'right' }}>
                <Tooltip placement='top' title='Play sound'>
                  <IconButton
                    className={clsx(classes.small, classes.iconOffset)}
                    onClick={_playSound(sound)}
                  >
                    <Play />
                  </IconButton>
                </Tooltip>
                <Tooltip placement='top' title='Edit sound'>
                  <IconButton
                    className={clsx(classes.small, classes.iconOffset)}
                    onClick={() => onEdit({
                      ...sound,
                      file: null
                    })}
                  >
                    <Pencil />
                  </IconButton>
                </Tooltip>
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
