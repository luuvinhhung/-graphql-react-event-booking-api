import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from '../routes'
import PrivateRoute from '../utils/PrivateRoute'

const Root = () => (
  <Router>
    <Switch>
      {/* chuyen qua privateRoute */}
      {routes.map((route, i) =>
        route.private === true ? (
          <PrivateRoute key={i} {...route} />
        ) : (
          <Route key={i} {...route} />
        )
      )}
      <Redirect to='/login' />
    </Switch>
  </Router>
)

export default Root
