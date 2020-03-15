import React from 'react'
import { render, cleanup, wait } from '@testing-library/react'
import MovieDetails from './MovieDetails'
import { movies } from './Movie.test'

const match = {
    params:{
        id: movies[0].id,
    }
}

afterEach(()=> cleanup)

test('<MovieDetails />', async () => {
    fetch.mockResponseOnce(JSON.stringify(movies[0]))
    const { getByTestId } = render(<MovieDetails match={match}/>)
    await wait(() => getByTestId('movie-title'))
    expect(getByTestId('movie-title').textContent).toBe(movies[0].title)
})
