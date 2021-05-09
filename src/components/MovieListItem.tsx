import React, { FC, ReactNode } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  makeStyles,
} from '@material-ui/core';

type Props = {
  movie: Movie;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
};

const MovieListItem: FC<Props> = ({
  movie,
  primaryAction,
  secondaryAction,
}) => {
  const classes = useStyles();

  return (
    <ListItem>
      <img
        className={classes.poster}
        src={
          movie.Poster === 'N/A'
            ? 'https://via.placeholder.com/300x450?text=shoppies'
            : movie.Poster
        }
        alt={movie.Title}
      />
      <ListItemText>
        <div className={classes.title}>
          <Typography>{movie.Title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {movie.Year}
          </Typography>
        </div>
        {primaryAction}
      </ListItemText>
      <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
    </ListItem>
  );
};

export default MovieListItem;

const useStyles = makeStyles((theme) => ({
  poster: {
    objectFit: 'contain',
    height: 150,
    width: 100,
    marginRight: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));
