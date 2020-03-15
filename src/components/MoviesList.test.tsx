import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup, wait } from '@testing-library/react'
import MoviesList from './MoviesList'
import { POSTER_PATH } from './Movie'
import { movies } from './Movie.test'
import { searchMovies } from '../hooks'

jest.mock('../hooks')

afterEach(()=> {
    cleanup
    jest.resetAllMocks()
})

const FetchError = {
    message: 'invalid json response body at  reason: Unexpected end of JSON input',
    type: 'invalid-json'
}

function buildSearch(overrides: any) {
    return ({
        data: {
            results: ['TEST_MOVIES']
        },
        error: {
            message: 'TEST_ERROR'
        },
      ...overrides,
    })
  }

test('<MoviesList />', async () => {
    const query = 'a'
    const pageNumber = 1

    searchMovies.mockResolvedValueOnce(buildSearch({ data: {results: movies}, error: null }))
    
    const { getByTestId, queryByTestId, getAllByTestId } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>
    )

    expect(searchMovies).toHaveBeenCalledWith(query, pageNumber)
    expect(searchMovies).toHaveBeenCalledTimes(1)
    expect(getByTestId('loading')).toBeTruthy()

    await wait(() => getAllByTestId('movie-link'))
    expect(getAllByTestId('movie-link').length).toBe(movies.length)
    expect(queryByTestId('loading')).toBeFalsy()
    expect(getAllByTestId('movie-link')[0].getAttribute('href')).toBe(`/${movies[0].id}`)
    expect(getAllByTestId('movie-img')[0].src).toBe(`${POSTER_PATH}${movies[0].poster_path}`)
    
})
