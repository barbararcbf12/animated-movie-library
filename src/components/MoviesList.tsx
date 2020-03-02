import React, { useState, useEffect } from 'react'
import { MovieType } from '../@types/Movie'
import { searchMovies } from '../hooks'
import Movie from './Movie'
import styled from 'styled-components'

export const MovieGrid = styled.div`
  display: grid;
  padding: 2rem 10rem;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 1rem;
  grid-column-gap: 5px;
`

const PageContainer = styled.div`
  width: '100%';
  height: 100vh;
`

const WrapperSearch = styled.div`
    background: transparent;
    border: 1px solid #fff;
    display: flex;
    border: 1px solid #dfe1e5;
    box-shadow: none;
    height: 39px;
    width: 638px;
    border-radius: 24px;
    z-index: 3;
    height: 44px;
    margin: 0 auto;
`

const InputSearch = styled.input`
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 10px 20px 0 20px;
  color: #fff; //rgba(0,0,0,.87);
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

function MoviesList(){
  const [movies, setMovies] = useState<MovieType[] | any>()
  let [pageNumber, setPageNumber] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [query, setQuery] = useState<any>('a')

  useEffect(() => {
    searchMovies({query, setMovies, pageNumber, setPageNumber, setTotalPages})
  }, [query, pageNumber])

  const nextPage = () => {
    if(movies && pageNumber && totalPages && pageNumber < totalPages) {
      setPageNumber(pageNumber +=1)
      searchMovies({query, setMovies, pageNumber, setPageNumber, setTotalPages}) 
    }
  } 

  const previousPage = () => {
    if(movies && pageNumber && pageNumber !== 1) {
      setPageNumber(pageNumber -=1)
      searchMovies({query, setMovies, pageNumber, setPageNumber, setTotalPages}) 
    }
  }

  const filterSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let term = event.target.value
    setPageNumber(1)
    if(term.length > 0) setQuery(term)
    else setQuery('a')
  }

  const previous = "< previous page"
  const next = "next page >"

    return (
      <PageContainer>
        <WrapperSearch>
          <InputSearch
            type="search"
            placeholder="Search movies..."
            onChange={ event => filterSearch(event) }
          />
        </WrapperSearch>
        <Pagination>
          <button onClick={previousPage} className="navItems" style={
            movies && pageNumber && pageNumber !== 1 ? {color:'#fff'} : {color:'#555'}}
          >{previous}</button>
          <div className="pagination">Page {pageNumber} of {totalPages}</div>
          <button onClick={nextPage} className="navItems" style={
            movies && totalPages && pageNumber < totalPages ? {color:'#fff'} : {color:'#555'}}
          >{next}</button>
        </Pagination>
        {movies?.length === 0 ? (<h1>There are no films available.</h1>) : (
          <MovieGrid>
              {movies?.map((movie: MovieType) => (
                  <Movie key={movie.id} movie={movie} />
              ))}
          </MovieGrid>)}
      </PageContainer>
    )
}

export default MoviesList
