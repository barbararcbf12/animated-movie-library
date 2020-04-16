import React from 'react'
import { Route, Switch, useLocation }  from 'react-router-dom'
import MoviesList from './MoviesList'
import MovieDetails from './MovieDetails'
import { animated, useTransition } from 'react-spring'
import Footer from './Footer'

const Main = () => {
    const location: any = useLocation()

    const transitions = useTransition(location, location => location.key, {
        from: { opacity: 0, position: 'absolute', width: '100%', transform: 'translate3d(100%, 0, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, 100%, 0)' }
    })
    return (
        <main>
            { transitions.map(({ item, key, props }) => ( item &&
                <animated.div key={key} style={props}>
                    <Switch location={item}>
                        <Route exact path="/" component={MoviesList} />
                        <Route path="/:id" component={MovieDetails} />
                    </Switch> 
                    <Footer />
                </animated.div>
            ))}
        </main>
    )
}

export default Main