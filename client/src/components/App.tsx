import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'

import theme from '../theme'

import { DashboardMain } from './dashboard'
import { PlayerMain } from './player'

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Redirect from='/' to='/dashboard' exact />
        <Route path='/dashboard/' component={() => <DashboardMain />} />
        <Route path='/player/' component={() => <PlayerMain />} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
)

export default hot(module)(App)