import React, { FC } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  nominationAdded,
  nominationDeleted,
} from '../features/movies/moviesSlice';

import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
  movies: Movie[];
  title: string;
  addAction?: boolean;
  removeAction?: boolean;
};

const MovieList: FC<Props> = ({
  movies,
  title,
  addAction = false,
  removeAction = false,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const nominations = useAppSelector((state) => state.movies.nominations);

  const renderMovieItems = () => {
    return movies.map((movie, index) => (
      <ListItem key={index}>
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
          {addAction && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(nominationAdded(movie));
              }}
              disabled={nominations[movie.Title] && true}
            >
              Nominate
            </Button>
          )}
        </ListItemText>
        {removeAction && (
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => dispatch(nominationDeleted(movie))}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    ));
  };

  return (
    <List subheader={<Typography variant="h5">{title}</Typography>}>
      {renderMovieItems()}
    </List>
  );
};

export default MovieList;

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
