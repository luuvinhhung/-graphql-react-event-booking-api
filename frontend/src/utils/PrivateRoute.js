import React from 'react'
import Auth from '../context/Authentication'
import { Route, Redirect } from 'react-router-dom'
import withLoadable from './loadable'

const PrivateRoute = route => (
  // console.log(route.component) ||
  <Route
    render={(props) =>
      Auth.isAuthenticated ? (
        // <route.component routes={route.routes} />
        <Route
          {...route}
          component={props => {
            // console.log(`../pages/${route.component}/`)
            const MyComponent = withLoadable(
              import(`../pages/${route.component}/`)
            )
            return <MyComponent {...props} routes={route.routes} />
          }}
        />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
)

export default PrivateRoute
