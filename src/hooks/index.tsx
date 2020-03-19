import { MovieType } from '../@types/Movie'

export const themoviedb = process.env.REACT_APP_THEMOVIEDB_APIKEY

const URL_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key="

export type FetchError = {
    message: string,
    type: string
}

export async function fetchMovie(movieId: string): Promise<{
    data: MovieType | undefined;
    error: FetchError | undefined
}>{
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${themoviedb}&language=en-US`)
        const movie = await res.json()
        return { data: movie, error: undefined }
    } catch (e) {        
        return { data: undefined, error: e }
    }
}

export async function searchMovies(query: string, pageNumber: number): Promise<{
    data: any | undefined;
    error: FetchError | undefined
}>{
    try {
        const res = await fetch(`${URL_SEARCH + themoviedb + "&language=en-US&query=" + query + "&page=" + pageNumber}`)
        const movies = await res.json()
        return { data: movies, error: undefined }
    } catch (e) {
        return { data: undefined, error: e }
    }
  }
