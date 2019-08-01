import React, { useState } from 'react'
import { Home, Menu, MusicNote, Fire, Account } from 'mdi-material-ui'
import { Switch, Route, Link } from 'react-router-dom'
import { useRouter } from '../../hooks'
import clsx from 'clsx'

import HomePage from './HomePage'
import SoundPage from './SoundPage'
import ConnectionPage from './ConnectionPage'
import UserPage from './UserPage'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography as T,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'

const routes = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: Home,
    component: HomePage
  },
  {
    name: 'Sound Manager',
    path: '/dashboard/sounds',
    icon: MusicNote,
    component: SoundPage
  },
  {
    name: 'Users',
    path: '/dashboard/users',
    icon: Account,
    component: UserPage
  },
  {
    name: 'Connections',
    path: '/dashboard/connection',
    icon: Fire,
    component: ConnectionPage
  }
]

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      backgroundColor: theme.palette.primary.main
    },
    menuButton: {
      marginLeft: theme.spacing(-0.75),
      marginRight: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    },
    iconButton: {
      marginRight: theme.spacing(-0.75),
      marginLeft: theme.spacing(1)
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8)
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    drawerSelect: {
      borderLeft: `4px solid ${theme.palette.primary.dark}`
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
)

export default () => {
  const [ navActive, setNavActive ] = useState(true)

  const classes = useStyles()
  const { location } = useRouter()

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='Open Menu'
            onClick={() => setNavActive(!navActive)}
          >
            <Menu />
          </IconButton>
          <T variant='h3' color='inherit' noWrap className={classes.title}>
            Twitch Play Sounds
          </T>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: navActive,
          [classes.drawerClose]: !navActive
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: navActive,
            [classes.drawerClose]: !navActive
          })
        }}
        open={navActive}
      >
        <div className={classes.toolbar} />
        <List>
          {routes.map(route => (
            <ListItem
              key={route.path}
              classes={{ selected: classes.drawerSelect }}
              component={Link}
              button to={route.path}
              selected={location.pathname === route.path}
            >
              <ListItemIcon>
                <route.icon />
              </ListItemIcon>
              <ListItemText>{route.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={`${route.path}/`}
              exact
              component={() => <route.component />}
            />
          ))}
        </Switch>
      </main>
    </div>
  )
}
