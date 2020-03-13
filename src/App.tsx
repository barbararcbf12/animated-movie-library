import React from 'react'
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
}  from 'react-router-dom'
import './App.css'
import styled from 'styled-components'
import MoviesList from './components/MoviesList'
import MovieDetails from './components/MovieDetails'
import Header from './components/Header'
import Footer from './components/Footer'

const Main = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Switch>
          <Main>
              <Route exact path="/" component={MoviesList} />
              <Route path="/:id" component={MovieDetails} />
          </Main>
        </Switch> 

        <Footer />
      </div>
    </Router>
  )
}

export default App
