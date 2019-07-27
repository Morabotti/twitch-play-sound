import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { DashboardMain } from './dashboard'
import { PlayerMain } from './player'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Redirect from='/' to='/dashboard' exact />
      <Route path='/dashboard/' component={() => <DashboardMain />} />
      <Route path='/player/' component={() => <PlayerMain />} />
    </Switch>
  </BrowserRouter>
)

export default hot(module)(App)