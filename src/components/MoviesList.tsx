import React, { useState, useEffect } from 'react'
import { MovieType } from '../@types/Movie'
import { fetchMovies } from '../hooks/hooks'
import { themoviedb } from '../settings/themoviedb'
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
  const [movies, setMovies] = useState<MovieType[]>()

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