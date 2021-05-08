import React, { FC, useState } from 'react';
import { ThemeProvider, Box, makeStyles } from '@material-ui/core';
import Header from './Header';
import createTheme from '../../theme';

const Layout: FC = ({ children }) => {
  const [isDark, setDarkTheme] = useState<boolean>(true);
  const classes = useStyles();

  return (
    <ThemeProvider theme={createTheme(isDark)}>
      <Box bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Header onModeSwitch={() => setDarkTheme(!isDark)} isDark={isDark} />
        <Box component="main" height="100vh">
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
      padding: theme.spacing(10, 2, 0),
      height: '100%',
    },
  }),
  { name: 'layout' }
);
