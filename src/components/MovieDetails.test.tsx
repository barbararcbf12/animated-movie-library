import React from 'react'
import { render, cleanup, wait } from '@testing-library/react'
import MovieDetails from './MovieDetails'
import { fetchMovie, themoviedb } from '../hooks'
import { createMemoryHistory, createLocation } from 'history'
import { Error, ApiResponse } from './MoviesList.test'
import { movies } from './Movie.test'
import { match as routerMatch } from 'react-router'

jest.mock('../hooks')

afterEach(()=> {
    jest.clearAllMocks()
    cleanup
})

function buildSearch(overrides: any): ApiResponse {
    return ({
        data: 'TEST_DATA',
        error: undefined,
      ...overrides,
    })
}

const history = createMemoryHistory()
const path = `/:id`

const match: routerMatch<{ id: string }> = {
    isExact: true,
    path,
    url: path.replace(':id', movies[0].id),
    params: { id: movies[0].id }
}

const location = createLocation(match.url)

test('<MovieDetails />', async () => {

    fetchMovie.mockResolvedValueOnce(buildSearch({ data: movies[0] , error: undefined }))
    
    const { getByTestId, queryByTestId } = render(<MovieDetails match={match} history={history} location={location} />)

    expect(fetchMovie).toHaveBeenCalledWith(match.params.id)
    expect(fetchMovie).toHaveBeenCalledTimes(1)
    expect(getByTestId('loading')).toBeTruthy()

    await wait(() => getByTestId('movie-title'))
    expect(queryByTestId('loading')).toBeFalsy()
    expect(getByTestId('movie-title').textContent).toBe(movies[0].title)
    
})

test('<MovieDetails /> api call fails', async () => {

    fetchMovie.mockResolvedValueOnce(buildSearch({ data: undefined, error: { message: Error.message , type: Error.type } }))
    
    const { getByTestId } = render(<MovieDetails match={match} history={history} location={location} />)

    expect(fetchMovie).toHaveBeenCalledWith(match.params.id)
    expect(fetchMovie).toHaveBeenCalledTimes(1)
    await wait(() => getByTestId('errormsg'))
    expect(getByTestId('errormsg')).toBeTruthy()
    
})
