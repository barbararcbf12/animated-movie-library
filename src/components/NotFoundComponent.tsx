import React from 'react'
import { Link }  from 'react-router-dom'
import { MovieInfo } from '../components/MovieDetails'

function NotFoundComponent(){
    return(
        <MovieInfo>
            <div>
                <h1>Page not found</h1>
                <Link to="/">
                    <h5>back to the movies' list</h5>
                </Link>
            </div>
        </MovieInfo>
    )
}

export default NotFoundComponent