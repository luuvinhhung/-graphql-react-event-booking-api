import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { routes } from '../routes'
import PrivateRoute from '../utils/PrivateRoute'
import withLoadable from '../utils/loadable'

const Root = () => (
  <Router>
    <Switch>
      {/* chuyen qua privateRoute */}
      {routes.map((route, i) =>
        route.private === true ? (
          <PrivateRoute key={i} {...route} />
        ) : (
          // <Route key={i} {...route} />
          <Route
            key={i}
            {...route}
            component={props => {
              const MyComponent = withLoadable(import(`./${route.component}/`))
              return <MyComponent {...props} routes={route.routes} />
            }}
          />
        )
      )}
      <Redirect to='/login' />
    </Switch>
  </Router>
)

export default Root
