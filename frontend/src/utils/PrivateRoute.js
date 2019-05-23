import React from 'react'
import Auth from '../context/Authentication'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = route => (
  // console.log(route.component) ||
  <Route
    render={() =>
      Auth.isAuthenticated ? (
        <route.component routes={route.routes} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
)

export default PrivateRoute
