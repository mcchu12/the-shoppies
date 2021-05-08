import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h3" align="center">
          Enjoy watching movies?
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          Try Shoppies for free, and nominate your favourite movies with one
          easy click.
        </Typography>
      </div>

      <Link to="/search">
        <Button variant="contained" color="primary" size="large">
          Get started
        </Button>
      </Link>
    </div>
  );
};

export default Home;

const useStyles = makeStyles(
  (theme) => ({
    root: {
      margin: theme.spacing('auto', 1),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      '& > *': {
        marginBottom: theme.spacing(4),
      },
    },
  }),
  { name: 'home' }
);
