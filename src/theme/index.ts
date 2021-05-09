import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const createTheme = (isDarkMode: boolean) => {
  const theme = createMuiTheme({
    overrides,
    palette: { ...palette, type: isDarkMode ? 'dark' : 'light' },
    typography
  })

  return responsiveFontSizes(theme);
}

export default createTheme;