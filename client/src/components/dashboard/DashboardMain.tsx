import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from '.'

export default () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  )
}
