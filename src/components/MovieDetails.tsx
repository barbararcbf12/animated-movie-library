import React, { useState, useEffect } from 'react'
import { MovieType } from '../@types/Movie'
import { RouteComponentProps } from 'react-router-dom'
import { BACKDROP_PATH, POSTER_PATH } from './Movie'
import { Poster } from './Movie'
import styled from 'styled-components'
import { fetchMovie, themoviedb } from '../hooks'
import NO_POSTER from '../no-poster.jpg'

const MovieWrapper = styled.div`
    position: relative;
    padding-top: 30vh;
    background: url(${(props: PropsStyle) => props.backdrop}) no-repeat;
    background-size: cover;
    width: 100%;
    min-height: 80vh;

    @media only screen 
    and (max-width : 750px) 
    and (max-height : 1334px) {
        /* Styles here */
        background-size: contain;
    }
`

export const MovieInfo = styled.div`
    background: #fff;
    text-align: left;
    padding: 2rem 10%;
    position: relative;
    top: 150px;
    display: flex;
    > div {
        margin-left: 20px;
    }
    img {
        position: relative;
        top: -5rem;
    }

    @media only screen 
    and (max-width : 750px) 
    and (max-height : 1334px) {
    /* Styles here */
        position: relative;
        top: 10px;
        > div {
            margin-left: -165px;
        }
        img {
            top: -14rem;
            left: -1rem;
            height: 231px;
            width: 154px; 
        }
    }
`

type PropsStyle = {
    backdrop: string
}

export type NavigationProp = {
    id: string
}

function MovieDetails({ match }: RouteComponentProps<NavigationProp>) {
    const [movie, setMovie] = useState<MovieType>()
    const [URL_MOVIE, setUrl] = useState('')

    useEffect(() => {
        // let isCurrent = true
        if(match){
            setUrl(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${themoviedb}&language=en-US`)
        }
        
        fetchMovie({ URL_MOVIE, setMovie })

    }, [match, URL_MOVIE])

    if(!movie?.id) return null

    return (
        <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`} >
            <MovieInfo>
                <Poster src={movie.poster_path ? `${POSTER_PATH}${movie.poster_path}` : NO_POSTER} alt={movie.title} />
                <div>
                    <h1 data-testid="movie-title">{ movie.title }</h1>
                    <h5>{`Release date: ${movie.release_date}`}</h5>
                    <article>{movie.overview}</article>
                </div>
            </MovieInfo>
        </MovieWrapper>
    )
}

export default MovieDetails
