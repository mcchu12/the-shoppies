import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';

const createTheme = (isDarkMode: boolean) => {
  const theme = createMuiTheme({
    palette: { ...palette, type: isDarkMode ? 'dark' : 'light' },
    typography
  })

  return responsiveFontSizes(theme);
}

export default createTheme;