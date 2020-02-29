import React from 'react'
import ErrorComponent from '../components/ErrorComponent'
import { MovieType } from '../@types/Movie'

type MoviesRequest = {
    url: string,
    setMovies: React.Dispatch<React.SetStateAction<MovieType[] | undefined>>
}

export async function fetchMovies({ url, setMovies }: MoviesRequest){
    try {
        const res = await fetch(url)
        const movies = await res.json()
        setMovies(movies.results)
    } catch (e) {
        return <ErrorComponent />
    }
}

type MovieRequest = {
    url: string,
    setMovie: React.Dispatch<React.SetStateAction<MovieType | undefined>>
}

export async function fetchMovie({ url, setMovie }: MovieRequest){
    try {
        const res = await fetch(url)
        const movie = await res.json()
        setMovie(movie)
      } catch (e) {
        return <ErrorComponent />
      }
}