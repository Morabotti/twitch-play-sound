import { useContext } from 'react'
import { __RouterContext, RouteComponentProps } from 'react-router'

export default <Params extends { [K in keyof Params]?: string }> (): RouteComponentProps<Params> => (
  useContext(__RouterContext) as RouteComponentProps<Params>
)
