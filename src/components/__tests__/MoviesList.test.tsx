import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup, wait } from '@testing-library/react'
import MoviesList from '../MoviesList'
import { POSTER_PATH } from '../Movie'
import { movies } from './Movie.test'
import { searchMovies, FetchError } from '../../hooks'
import { MovieType } from '../../@types/Movie'

jest.mock('../../hooks')

afterEach(()=> {
    jest.clearAllMocks()
    cleanup
})

export const Error: FetchError = {
    message: 'Failed to fetch',
    type: 'invalid-json'
}

export type ApiResponse = {
    data: {
        results: MovieType[]
    } | undefined,
    error: FetchError | undefined
}

function buildSearch(overrides: any): ApiResponse {
    return ({
        data: undefined,
        error: undefined,
      ...overrides,
    })
  }

test('<MoviesList />', async () => {
    const query = 'a'
    const pageNumber = 1

    searchMovies.mockResolvedValueOnce(buildSearch({ data: { results: movies }, error: undefined }))
    
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

test('<MoviesList /> fails api call', async () => {
    const query = 'a'
    const pageNumber = 1
    searchMovies.mockResolvedValueOnce(buildSearch({ data: undefined, error: { message: Error.message , type: Error.type } }))
    
    const { getByTestId } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>
    )

    expect(searchMovies).toHaveBeenCalledWith(query, pageNumber)
    expect(searchMovies).toHaveBeenCalledTimes(1)
    await wait(() => getByTestId('errormsg'))
    expect(getByTestId('errormsg')).toBeTruthy()
})

