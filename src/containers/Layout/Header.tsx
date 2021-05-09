import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Hidden,
  Divider,
  Drawer,
  Badge,
} from '@material-ui/core';
import { nominationDeleted } from '../../features/movies/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MovieListItem from '../../components/MovieListItem';
import MovieList from '../../components/MovieList';
import LogoIcon from './logo.svg';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness7';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
  onModeSwitch: () => void;
  isDark: boolean;
};

const Header: FC<Props> = ({ isDark, onModeSwitch }) => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const nominations = useAppSelector((state) =>
    Object.values(state.movies.nominations)
  );
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const renderLogo = () => (
    <Link to="/" className={classes.logo}>
      <img src={LogoIcon} alt="shoppies logo" />
      <Typography variant="h5" color="textPrimary" display="inline">
        shoppies
      </Typography>
    </Link>
  );

  const renderIcons = () => (
    <div>
      <Tooltip title="Toggle light/dark theme">
        <IconButton aria-label="dark/light theme switch" onClick={onModeSwitch}>
          {isDark ? <LightIcon /> : <DarkIcon />}
        </IconButton>
      </Tooltip>

      <Hidden mdUp>
        <Tooltip title="Nomination lists">
          <IconButton onClick={() => setDrawerOpen(true)}>
            <Badge
              variant="dot"
              badgeContent={nominations.length}
              color="primary"
            >
              <BookmarksIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Hidden>
    </div>
  );

  const renderDrawer = () => (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      PaperProps={{ className: classes.drawer }}
      onClose={() => setDrawerOpen(false)}
    >
      <div>
        <IconButton onClick={() => setDrawerOpen(false)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <MovieList title="Nominations">
        {Object.values(nominations).map((movie, index) => (
          <MovieListItem
            key={index}
            movie={movie}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => dispatch(nominationDeleted(movie))}
              >
                <DeleteIcon />
              </IconButton>
            }
          />
        ))}
      </MovieList>
    </Drawer>
  );

  return (
    <AppBar position="fixed" elevation={0} color="inherit">
      <Toolbar className={classes.toolbar}>
        {renderLogo()}
        {renderIcons()}
      </Toolbar>

      {renderDrawer()}
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
  drawer: {
    padding: theme.spacing(1),
    width: '100vw',

    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      minWidth: '400px',
    },
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));
