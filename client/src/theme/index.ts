import { createMuiTheme } from '@material-ui/core/styles'

import palette, { customColors } from './palette'
import typography from './typography'
import overrides from './overrides'

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
    modal: 1300,
    snackbar: 1250
  }
})

export default theme

export {
  customColors
}
