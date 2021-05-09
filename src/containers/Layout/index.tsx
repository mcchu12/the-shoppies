import React, { FC, useState, useMemo } from 'react';
import {
  ThemeProvider,
  Box,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import Header from './Header';
import createTheme from '../../theme';
import { getSavedThemeMode, saveThemeMode } from '../../theme/utils';

const Layout: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const savedThemeMode = useMemo(() => getSavedThemeMode(), []);
  const [isDark, setDarkTheme] = useState<boolean>(
    savedThemeMode ? savedThemeMode === 'dark' : prefersDarkMode
  );
  const theme = useMemo(() => createTheme(isDark), [isDark]);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Header
          onModeSwitch={() => {
            saveThemeMode(isDark ? 'light' : 'dark');
            setDarkTheme(!isDark);
          }}
          isDark={isDark}
        />
        <Box component="main">
          <section className={classes.section}>{children}</section>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

const useStyles = makeStyles(
  (theme) => ({
    section: {
      padding: theme.spacing(10, 1, 0),

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(10, '6vw'),
      },
    },
  }),
  { name: 'layout' }
);
