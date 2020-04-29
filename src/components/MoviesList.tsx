import React, { useState, useEffect } from 'react'
import { MovieType } from '../@types/Movie'
import ErrorComponent from '../components/ErrorComponent'
import { searchMovies } from '../hooks'
import Movie from './Movie'
import styled from 'styled-components'

export const MovieGrid = styled.div`
  display: grid;
  padding: 2rem 10rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
  grid-column-gap: 5px;
  min-height: 0;  /* NEW */
  min-width: 0;   /* NEW; needed for Firefox */

  @media only screen 
    and (max-width : 750px) 
    and (max-height : 1334px) {
    padding: 1rem 0.25rem;
    grid-row-gap: 0.25rem;
    grid-template-columns: repeat(3, 1fr);
  }
`

export const MovieGridItem = styled.div`
  background: #DFE7E7;
  overflow: hidden;  /* NEW */
  min-width: 0;      /* NEW; needed for Firefox */
`

const PageContainer = styled.div`
  width: '100%';
`

const WrapperSearch = styled.div`
  background: transparent;
  border: 1px solid #fff;
  display: flex;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  height: 39px;
  max-width: 638px;
  border-radius: 24px;
  z-index: 3;
  height: 44px;
  margin: 0 auto;

  @media only screen 
    and (max-width : 750px) 
    and (max-height : 1334px) {
    max-width: 360px;
  }
`

const InputSearch = styled.input`
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 10px 20px 0 20px;
  color: #fff;
  word-wrap: break-word;
  outline: none;
  display: flex;
  flex: 100%;
  height: 34px;
  font-size: 16px;
`

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

type State = {
  loading: boolean,
  movies: MovieType[] | undefined,
  error: string | undefined
}

function MoviesList(){
  const [totalPages, setTotalPages] = useState<number | null>(null)
  let [pageNumber, setPageNumber] = useState<number>(1)
  const [query, setQuery] = useState<any>('a')
  const [state, setState] = useState<State>({
    loading: false,
    movies: undefined,
    error: undefined
  })

  const { loading, movies, error } = state

  useEffect(() => {
    async function getData(){
      setState({ loading: true, movies: undefined, error: undefined })
      const { data, error } = await searchMovies(query, pageNumber)
      if(error !== undefined){
        setState({ loading: false, movies: undefined, error: error.message })
      }else{
        setState({ loading: false, movies: data.results, error: undefined })
        setTotalPages(data.total_pages)
      }
    }
    getData()

  }, [query, pageNumber])

  const nextPage = () => {
    if(movies && pageNumber && totalPages && pageNumber < totalPages) {
      setPageNumber(pageNumber +1)
      searchMovies(query, pageNumber)
    }
  } 

  const previousPage = () => {
    if(movies && pageNumber && pageNumber !== 1) {
      setPageNumber(pageNumber -1)
      searchMovies(query, pageNumber)
    }
  }

  const filterSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let term = event.target.value
    setPageNumber(1)
    if(term.length > 0) setQuery(term)
    else setQuery('a')
  }

  const previous = "< previous"
  const next = "next >"

  return error ? <ErrorComponent error={error} />
  :  (
    <PageContainer>
        <WrapperSearch>
          <label htmlFor="searchBox" className="visuallyhidden">
            Search for movies...
          </label>
            <InputSearch
              id="searchBox"
              type="search"
              placeholder="Search for movies..."
              onChange={ event => filterSearch(event) }
            />
        </WrapperSearch>
        { loading ? (<h1 data-testid="loading" className="loading">Loading...</h1>) : (
          <Pagination>
            <button 
              onClick={previousPage} 
              className="navItems" 
              disabled={movies && pageNumber && pageNumber !== 1 ? false : true} 
              tabIndex={movies && pageNumber && pageNumber !== 1 ? 0 : -1} 
              style={movies && pageNumber && pageNumber !== 1 ? {cursor: 'pointer'} : {cursor: 'none'}}
            >
              {previous}
            </button>

            <div className="pagination">Page {pageNumber} of {totalPages}</div>
            <button onClick={nextPage} className="navItems" style={
              movies && totalPages && pageNumber < totalPages ? {color:'#fff'} : {color:'#555'}}
            >
              {next}
            </button>
          </Pagination>
        )}
        
        <MovieGrid>
            {movies?.map((movie: MovieType) => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </MovieGrid>

      </PageContainer>
    )
}

export default MoviesList
