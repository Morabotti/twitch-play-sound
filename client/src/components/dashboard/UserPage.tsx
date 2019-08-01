import React, { useState } from 'react'
import { Layout, UserTable, NewUserDialog, EditUserDialog } from '.'
import { User } from '../../types'
import { Plus } from 'mdi-material-ui'
import { useUsers } from '../../hooks'

import {
  createStyles,
  Theme,
  makeStyles,
  Tooltip,
  Fab
} from '@material-ui/core'

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
  const [ isNewDialogOpen, setIsNewDialogOpen ] = useState(false)
  const [ editableUser, setEditableUser ] = useState<null | User>(null)
  const {
    users,
    loading,
    addUser,
    deleteUser,
    editUser
  } = useUsers()

  return (
    <>
      <Layout title='Manage Users'>
        <UserTable
          users={users}
          loading={loading}
          onDelete={deleteUser}
          onEdit={(user) => setEditableUser(user)}
        />
      </Layout>
      <div className={classes.action}>
        <Tooltip title='Add new user'>
          <Fab
            color='secondary'
            onClick={() => setIsNewDialogOpen(true)}
          >
            <Plus />
          </Fab>
        </Tooltip>
      </div>
      <NewUserDialog
        isOpen={isNewDialogOpen}
        onClose={() => setIsNewDialogOpen(false)}
        onAdd={addUser}
      />
      <EditUserDialog
        isOpen={editableUser !== null}
        onClose={() => setEditableUser(null)}
        user={editableUser}
        onEdit={editUser}
        setUser={setEditableUser}
      />
    </>
  )
}
