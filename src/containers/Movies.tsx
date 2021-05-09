import React, { FC, useCallback, useState, useEffect } from 'react';
import {
  TextField,
  Container,
  Card,
  Box,
  Hidden,
  makeStyles,
  IconButton,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearQueries,
  searchMovieAsync,
  nominationAdded,
  nominationDeleted,
} from '../features/movies/moviesSlice';
import MovieList from '../components/MovieList';
import MovieListItem from '../components/MovieListItem';
import Banner from '../components/Banner';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {};

const Movies: FC<Props> = () => {
  const { queries, status, completed, nominations } = useAppSelector(
    (state) => state.movies
  );
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // Clear queries on componentWillUnmount
  useEffect(() => {
    return () => {
      dispatch(clearQueries());
    };
  }, [dispatch]);

  const handleOnChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = ev.target.value;
      setQuery(newQuery);
      dispatch(searchMovieAsync(newQuery));
    },
    [dispatch]
  );

  const renderSearchResult = () => {
    return (
      <Card className={classes.result}>
        <Banner
          isOpen={completed}
          message="You have reached 5 nominations limit."
        />
        <MovieList
          title={
            <>
              {`Search result ${query && `for "${query}":`}`}
              {status === 'loading' && <CircularProgress />}
            </>
          }
        >
          {queries.map((movie, index) => {
            return (
              <MovieListItem
                key={index}
                movie={movie}
                primaryAction={
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(nominationAdded(movie));
                    }}
                    disabled={completed || (nominations[movie.Title] && true)}
                  >
                    Nominate
                  </Button>
                }
              />
            );
          })}
        </MovieList>
      </Card>
    );
  };

  const renderNominationList = () => (
    <Hidden smDown>
      <Card className={classes.nominations}>
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
      </Card>
    </Hidden>
  );

  return (
    <Container maxWidth="lg">
      <TextField
        id="search"
        placeholder="Search movie"
        label="Movie Title"
        value={query}
        onChange={handleOnChange}
        variant="outlined"
        fullWidth
      />

      <Box mt={4} display="flex">
        {renderSearchResult()}
        {renderNominationList()}
      </Box>
    </Container>
  );
};

export default Movies;

const useStyles = makeStyles((theme) => ({
  result: {
    padding: theme.spacing(2),
    flex: 3,
  },
  nominations: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flex: 2,
  },
}));
