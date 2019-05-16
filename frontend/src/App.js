import React from 'react'
import './App.css'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'
import MainNavigation from './components/Navigation/MainNavigation'

function App () {
  return (
    <BrowserRouter>
      <>
        <MainNavigation />
        <main>
          <Switch>
            <Redirect from='/' to='/auth' exact />
            <Route path='/auth' component={AuthPage} />
            <Route path='/events' component={EventsPage} />
            <Route path='/bookings' component={BookingsPage} />
          </Switch>
        </main>
      </>
    </BrowserRouter>
  )
}

export default App
