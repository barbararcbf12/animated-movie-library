import React from 'react'
import ErrorComponent from '../components/ErrorComponent'
import { MovieType } from '../@types/Movie'

export const themoviedb = process.env.REACT_APP_THEMOVIEDB_APIKEY

const URL_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key="

type MovieRequest = {
    URL_MOVIE: string,
    setMovie: React.Dispatch<React.SetStateAction<MovieType | undefined>>
}

export async function fetchMovie({ URL_MOVIE, setMovie }: MovieRequest){
    try {
        const res = await fetch(URL_MOVIE)
        const movie = await res.json()
        setMovie(movie)
    } catch (e) {
        return <ErrorComponent error={e} />
    }
}

export async function searchMovies(query: string, pageNumber: number): Promise<{
    data: any;
    error: any
}>{
    try {
        const res = await fetch(`${URL_SEARCH + themoviedb + "&language=en-US&query=" + query + "&page=" + pageNumber}`)
        const movies = await res.json()
        return { data: movies, error: null }
    } catch (e) {
        return { data: [], error: e }
    }
  }
