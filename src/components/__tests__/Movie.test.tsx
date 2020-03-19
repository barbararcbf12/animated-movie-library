import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import Movie, { POSTER_PATH } from '../Movie'
import { MovieType } from '../../@types/Movie'

export const movies: MovieType[] = [
    { 
        popularity: 651.473,
        vote_count: 666,
        video: false,
        poster_path: "/eFCzU9Jqp2Ea17ysDkG8PB0NLiR.jpg",
        id: '475302',
        adult: false,
        backdrop_path: "/6fkqwqLEcDZOEAnBBfKAniwNxtx.jpg",
        original_language: "en",
        original_title: "A Rainy Day in New York",
        genre_ids: [35, 10749],
        title: "A Rainy Day in New York",
        vote_average: 6.7,
        overview: "Two young people arrive in New York to spend a weekend, but once they arrive they're met with bad weather and a series of adventures.",
        release_date: "2019-07-26",
    },
    { 
        popularity: 651.473,
        vote_count: 666,
        video: false,
        poster_path: "/eFCzU9Jqp2Ea17ysDkG8PB0NLiR.jpg",
        id: '475303',
        adult: false,
        backdrop_path: "/6fkqwqLEcDZOEAnBBfKAniwNxtx.jpg",
        original_language: "en",
        original_title: "King Kong",
        genre_ids: [35, 10749],
        title: "IT",
        vote_average: 6.7,
        overview: "Two young people arrive in New York to spend a weekend, but once they arrive they're met with bad weather and a series of adventures.",
        release_date: "2019-07-26",
    }
]

afterEach(() => cleanup)

test('<Movie />', () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <Movie movie={movies[0]} />
        </MemoryRouter>
    )
    expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movies[0].id}`)
    expect(getByTestId('movie-img').src).toBe(`${POSTER_PATH}${movies[0].poster_path}`)
})
