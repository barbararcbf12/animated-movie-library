import React from 'react'
import { MovieGrid } from '../components/MoviesList'

function ErrorComponent(error: any){
    return(
        <MovieGrid>
            <h1>The following error hapenned</h1>
            <h5>{error}</h5>
        </MovieGrid>
    )
}

export default ErrorComponent