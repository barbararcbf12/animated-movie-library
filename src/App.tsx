import React from 'react'
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
}  from 'react-router-dom'
import './App.css'
import MoviesList from './components/MoviesList'
import MovieDetails from './components/MovieDetails'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Switch>
            <Route exact path="/" component={MoviesList} />
            <Route path="/:id" component={MovieDetails} />
        </Switch>

        <Footer />
      </div>
    </Router>
  )
}

export default App
