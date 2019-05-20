import React from 'react'
import './App.css'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'
import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from './context/auth.context'

class App extends React.Component {
  state = {
    token: null,
    userId: null
  }
  login = (token, userId, tokenExtokenExpiration) => {
    this.setState({ token: token, userId: userId })
  }
  logout = () => { this.setState({ token: null, userId: null }) }
  render () {
    const { token } = this.state
    const { userId } = this.state
    return (
      <BrowserRouter> 
        <>
          <AuthContext.Provider
            value={{
              token: token,
              userId: userId,
              login: this.login,
              logout: this.logout
            }}>
            <MainNavigation />
            <main>
              <Switch>
                {token && <Redirect from='/' to='/events' exact />}
                {token && <Redirect from='/auth' to='/events' exact />}
                <Route path='/auth' component={AuthPage} />
                <Route path='/events' component={EventsPage} />
                {token && <Route path='/bookings' component={BookingsPage} />}
                <Redirect to='/auth' exact />
              </Switch>
            </main>
          </AuthContext.Provider>
        </>
      </BrowserRouter>
    )
  }
}

export default App
