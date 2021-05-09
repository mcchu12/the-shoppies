import axios from 'axios';

axios.defaults.baseURL = 'http://www.omdbapi.com/?apikey=51bbf62f';

const api = axios.create({
  baseURL: 'http://www.omdbapi.com',
  params: {
    apikey: '51bbf62f'
  }
})

export const fetchMovies = (query: string) => {
  return api.get('/', { params: { s: query } })
}

export const fetchMovieById = (id: string) => {
  return api.get(`&i=${id}`);
}