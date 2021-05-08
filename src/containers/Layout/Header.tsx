import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness7';
import LogoIcon from './logo.svg';

type Props = {
  onModeSwitch: () => void;
  isDark: boolean;
};

const Header: FC<Props> = ({ isDark, onModeSwitch }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" elevation={0} color="inherit">
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.logo}>
          <img src={LogoIcon} alt="shoppies logo" />
          <Typography variant="h5" color="textPrimary" display="inline">
            shoppies
          </Typography>
        </Link>

        <Tooltip title="Toggle light/dark theme">
          <IconButton
            aria-label="dark/light theme switch"
            onClick={onModeSwitch}
          >
            {isDark ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between',

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, '5vw'),
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',

    '& > img': {
      maxWidth: 30,
      maxHeight: 30,
      marginRight: theme.spacing(1),
    },
    '& > *': {
      fontStyle: 'italic',
    },
  },
}));
