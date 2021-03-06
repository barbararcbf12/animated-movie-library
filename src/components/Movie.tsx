import React from 'react'
import { Link }  from 'react-router-dom'
import { MovieType } from '../@types/Movie'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import NO_POSTER from '../no-poster.jpg'

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`

export const Wrapper = styled.div`
  overflow: hidden;
  height: 231px;
  @media only screen 
    and (max-width : 750px) 
    and (max-height : 1334px) {
    height: 100%;
  }
`

export const POSTER_PATH = 'http://image.tmdb.org/t/p/w154/'
export const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280/'

export type Props = {
  movie: MovieType;
}

function Movie(props: Props) {
  const { movie } = props
  
  const fade = useSpring({
    from: { 
      opacity : 0,
      transform: 'translate3d(0,-50px,0)',
    },
    opacity: 1,
    transform: 'translate3d(0,0,0)',
  })
  
  if(!movie) return null
  const { id, title, poster_path } = movie
  const movieId = id
  
  return(
    <animated.div style={fade}>
      <Wrapper>
        <Link to={`/${movieId}`} data-testid="movie-link" className={poster_path ? "" : "posterLinkWrapper"}>
          <span className={poster_path ? "visuallyhidden hideElement" : "posterLabel"}>{title}</span>
          <Poster 
            className="mini-poster" 
            src={poster_path ? `${POSTER_PATH}${poster_path}` : NO_POSTER} 
            alt={title} 
            data-testid="movie-img" 
          />
        </Link>
      </Wrapper>
    </animated.div>
  )
}

export default Movie
