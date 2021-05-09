import React, { FC, useCallback, useState, useEffect } from 'react';
import {
  TextField,
  Container,
  Card,
  Box,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearQueries,
  searchMovieAsync,
} from '../../features/movies/moviesSlice';
import MovieList from '../../components/MovieList';

type Props = {};

const Movies: FC<Props> = () => {
  const [query, setQuery] = useState<string>('');
  const searchResult = useAppSelector((state) => state.movies.queries);
  const nominations = useAppSelector((state) =>
    Object.values(state.movies.nominations)
  );
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
        <Card className={classes.result}>
          <MovieList
            title={`Search result ${query && `for "${query}":`}`}
            movies={searchResult}
            addAction
          />
        </Card>
        <Hidden mdDown>
          <Card className={classes.nominations}>
            <MovieList title="Nominations" movies={nominations} removeAction />
          </Card>
        </Hidden>
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
