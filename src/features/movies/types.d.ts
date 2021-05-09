interface Movie {
  Title: string,
  Year: string,
  Poster: string
}

interface MoviesState {
  queries: Movie[];
  status: 'idle' | 'loading' | 'failed';
  nominations: { [key: string]: Movie };
  completed: boolean;
}