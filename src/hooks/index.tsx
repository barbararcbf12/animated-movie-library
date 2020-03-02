import React from 'react'
import ErrorComponent from '../components/ErrorComponent'
import { MovieType } from '../@types/Movie'

export const themoviedb = process.env.REACT_APP_THEMOVIEDB_APIKEY

export const URL_DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${themoviedb}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`
const URL_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key="
const language = "&language=en-US"

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
        return <ErrorComponent />
    }
}

type MoviesSearch = {
    query: string,
    pageNumber: number,
    setMovies: React.Dispatch<React.SetStateAction<MovieType[] | undefined>>,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    setTotalPages: React.Dispatch<React.SetStateAction<number | null>>
}

export function searchMovies({query, setMovies, pageNumber, setPageNumber, setTotalPages}: MoviesSearch) {
    fetch(URL_SEARCH + `${themoviedb}` + language + "&query=" + query + "&page=" + pageNumber)
      .then(res => res.json())
      .then(json => {
        setMovies(json.results)
        setTotalPages(json.total_pages)
      })
  }
