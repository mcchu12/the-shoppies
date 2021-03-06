import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMovies } from './moviesService';

const nominations = localStorage.getItem('nominations');

const initialState: MoviesState = {
  queries: [],
  status: 'idle',
  nominations: nominations ? JSON.parse(nominations) : {},
  completed: nominations ? Object.values(JSON.parse(nominations)).length === 5 : false
};

export const searchMovieAsync = createAsyncThunk('movies/searchMovie', async (title: string) => {
  const res = await fetchMovies(title);

  if (res.data.Response === "True") {
    return res.data.Search;
  }

  return [];
})


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearQueries(state) {
      state.queries = []
    },
    nominationAdded(state, action: PayloadAction<Movie>) {
      if (Object.keys(state.nominations).length === 4) state.completed = true;
      state.nominations[action.payload.Title] = action.payload;
      localStorage.setItem('nominations', JSON.stringify(state.nominations))
    },
    nominationDeleted(state, action: PayloadAction<Movie>) {
      if (state.completed) state.completed = false;
      delete state.nominations[action.payload.Title];
      localStorage.setItem('nominations', JSON.stringify(state.nominations))
    }
  },
  extraReducers: builder => {
    builder.addCase(searchMovieAsync.pending, (state) => {
      state.status = 'loading';
    })
      .addCase(searchMovieAsync.fulfilled, (state, action) => {
        state.queries = action.payload;
        state.status = 'idle';
      })
  }

})

export const { clearQueries, nominationAdded, nominationDeleted } = moviesSlice.actions

export default moviesSlice.reducer;
