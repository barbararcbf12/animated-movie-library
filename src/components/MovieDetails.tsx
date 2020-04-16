import React, { useState, useEffect } from 'react'
import { MovieType } from '../@types/Movie'
import { RouteComponentProps } from 'react-router-dom'
import { BACKDROP_PATH, POSTER_PATH, Poster } from './Movie'
import styled from 'styled-components'
import { fetchMovie } from '../hooks'
import ErrorComponent from '../components/ErrorComponent'
import NO_POSTER from '../no-poster.jpg'

const MovieTitle = styled.h1`
    color: #000;
`

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

type State = {
  loading: boolean,
  movie: MovieType | undefined,
  error: string | undefined
}

function MovieDetails({ match }: RouteComponentProps<NavigationProp>) {
    const [state, setState] = useState<State>({
      loading: false,
      movie: undefined,
      error: undefined
    })

    const { loading, movie, error } = state

    useEffect(() => {
        async function getData(){
            setState({ loading: true, movie: undefined, error: undefined })
            const { data, error } = await fetchMovie(match?.params.id)
            if(error !== undefined){
                setState({ loading: false, movie: undefined, error: error.message })
            }else{
                setState({ loading: false, movie: data, error: undefined })
            }
        }
        getData()

    }, [match, match.params.id])

    if ( error ) return <ErrorComponent error={error} /> 
    if ( !loading && !movie?.id ) return <ErrorComponent error={"Movie not found!"} /> 

    return loading ? <h1 data-testid="loading" className="loading">Loading...</h1> : (
        <MovieWrapper backdrop={`${BACKDROP_PATH}${movie?.backdrop_path}`} >
            <MovieInfo>
                <Poster src={ movie?.poster_path ? `${POSTER_PATH}${movie?.poster_path}` : NO_POSTER } alt={movie?.title} />
                <div>
                    <MovieTitle data-testid="movie-title">{ movie?.title }</MovieTitle>
                    <p>{`Release date: ${ movie?.release_date }`}</p>
                    <article>{ movie?.overview }</article>
                </div>
            </MovieInfo>
        </MovieWrapper>
    )
}

export default MovieDetails