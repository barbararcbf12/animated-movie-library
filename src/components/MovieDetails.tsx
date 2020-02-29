import React, { useState, useEffect } from 'react'
import { MovieType } from '../@types/Movie'
import { RouteComponentProps } from 'react-router-dom'
import { BACKDROP_PATH, POSTER_PATH } from './Movie'
import { Poster } from './Movie'
import styled from 'styled-components'
import Overdrive from 'react-overdrive'
import { fetchMovie } from '../hooks/hooks'
import { themoviedb } from '../settings/themoviedb'

const MovieWrapper = styled.div`
    position: relative;
    padding-top: 50vh;
    background: url(${(props: PropsStyle) => props.backdrop}) no-repeat;
    background-size: cover;
`

export const MovieInfo = styled.div`
    background: #fff;
    text-align: left;
    padding: 2rem 10%;
    display: flex;
    > div {
        margin-left: 20px;
    }
    img {
        position: relative;
        top: -5rem;
    }
`

type PropsStyle = {
    backdrop: string
}

type NavigationProp = {
    id: string
}

function MovieDetails({ match }: RouteComponentProps<NavigationProp>) {
    const [movie, setMovie] = useState<MovieType>()
    const [url, setUrl] = useState('')

    useEffect(() => {
        if(match){
            setUrl(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${themoviedb}&language=en-US`)
        }
        
        fetchMovie({ url, setMovie })
    }, [match, url])
    
    const movieId = movie?.id && movie.id.toString()

    return (
        <MovieWrapper backdrop={`${BACKDROP_PATH}${movie?.backdrop_path}`} >
            <MovieInfo>
                <Overdrive id={movieId}>
                    <Poster src={`${POSTER_PATH}${movie?.poster_path}`} alt={movie?.title} />
                </Overdrive>
                <div>
                    <h1>{ movie?.title }</h1>
                    <h5>{`Release date: ${movie?.release_date}`}</h5>
                    <article>{movie?.overview}</article>
                </div>
            </MovieInfo>
        </MovieWrapper>
    )
}

export default MovieDetails
