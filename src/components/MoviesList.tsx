import React, { useState, useEffect } from 'react'
import { MovieType } from '../@types/Movie'
<<<<<<< HEAD
import { fetchMovies } from '../hooks/hooks'
import { themoviedb } from '../settings/themoviedb'
=======
import { searchMovies } from '../hooks'
>>>>>>> e35b02b... .env implementation
import Movie from './Movie'
import styled from 'styled-components'

export const MovieGrid = styled.div`
  display: grid;
  padding: 2rem 5rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
`

const url = `https://api.themoviedb.org/3/discover/movie?api_key=${themoviedb}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

function MoviesList(){
  const [movies, setMovies] = useState<MovieType[] | any>()
  let [pageNumber, setPageNumber] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [query, setQuery] = useState<any>('a')

  useEffect(() => {
    searchMovies({query, setMovies, pageNumber, setTotalPages})
  }, [query, pageNumber])

  const nextPage = () => {
    if(movies && pageNumber && totalPages && pageNumber < totalPages) {
      setPageNumber(pageNumber +=1)
      searchMovies({query, setMovies, pageNumber, setTotalPages}) 
    }
  } 

  const previousPage = () => {
    if(movies && pageNumber && pageNumber !== 1) {
      setPageNumber(pageNumber -=1)
      searchMovies({query, setMovies, pageNumber, setTotalPages}) 
    }
  }

    useEffect(() => {
        fetchMovies({url, setMovies})
    }, [])

    if(movies && movies.length === 0) return <h1>There are no films available.</h1>

    return (
      <MovieGrid>
          {movies?.map((movie) => (
              <Movie key={movie.id} movie={movie} />
          ))}
      </MovieGrid>
    )
}

export default MoviesList