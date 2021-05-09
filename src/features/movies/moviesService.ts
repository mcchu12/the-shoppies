import axios from 'axios';
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const api = axios.create({
  baseURL: 'https://www.omdbapi.com',
  params: {
    apikey: API_KEY
  }
})

export const fetchMovies = (query: string) => {
  return api.get('/', { params: { s: query } })
}

export const fetchMovieById = (id: string) => {
  return api.get(`&i=${id}`);
}