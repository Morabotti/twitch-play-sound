import React, { useState } from 'react'
import { useSounds } from '../../hooks/useSounds'
import { EditSound } from '../../types'

import {
  Layout,
  SoundTable,
  NewSoundDialog,
  EditSoundDialog
} from '.'

import {
  Tooltip,
  Fab,
  createStyles,
  Theme,
  makeStyles
} from '@material-ui/core'

import { Plus } from 'mdi-material-ui'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      position: 'fixed',
      bottom: '0',
      right: '0',
      margin: theme.spacing(3.5)
    }
  })
)

export default () => {
  const classes = useStyles()
  const {
    sounds,
    loading,
    addSound,
    editSound,
    deleteSound
  } = useSounds()

  const [ isNewDialogOpen, setIsNewDialogOpen ] = useState(false)
  const [ editableSound, setEditableSound ] = useState<null | EditSound>(null)

  return (
    <Layout title='Sound Manager'>
      <SoundTable
        sounds={sounds}
        loading={loading}
        onDelete={deleteSound}
        onEdit={setEditableSound}
      />
      <div className={classes.action}>
        <Tooltip title='Add new sound'>
          <Fab
            color='secondary'
            onClick={() => setIsNewDialogOpen(true)}
          >
            <Plus />
          </Fab>
        </Tooltip>
      </div>
      <NewSoundDialog
        isOpen={isNewDialogOpen}
        onClose={() => setIsNewDialogOpen(false)}
        onAdd={addSound}
      />
      <EditSoundDialog
        isOpen={editableSound !== null}
        onClose={() => setEditableSound(null)}
        sound={editableSound}
        onEdit={editSound}
        setSound={setEditableSound}
      />
    </Layout>
  )
}
