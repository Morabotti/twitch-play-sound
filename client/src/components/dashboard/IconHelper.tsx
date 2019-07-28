import React from 'react'
import { AccessLevel } from '../../types'
import { Twitch, Sword, Crown, StarFourPoints } from 'mdi-material-ui'
import { Tooltip } from '@material-ui/core'

interface Props {
  access: AccessLevel
}

export default ({
  access
}: Props) => {
  switch (access) {
    case 'ALL': return (
      <Tooltip title={access} placement='top'>
        <Twitch className={`icon-wrapper ${access}`} />
      </Tooltip>
    )
    case 'SUB': return (
      <Tooltip title={access} placement='top'>
        <StarFourPoints className={`icon-wrapper ${access}`} />
      </Tooltip>
    )
    case 'MOD': return (
      <Tooltip title={access} placement='top'>
        <Sword className={`icon-wrapper ${access}`} />
      </Tooltip>
    )
    case 'VIP': return (
      <Tooltip title={access} placement='top'>
        <Crown className={`icon-wrapper ${access}`} />
      </Tooltip>
    )
    default: return (
      <Tooltip title={access} placement='top'>
        <Twitch className={`icon-wrapper ${access}`} />
      </Tooltip>
    )
  }
}
