import React from 'react'
import { Route } from 'react-router-dom'
import withLoadable from './loadable'

const RouteWithSubRoutes = route => {
  return (
    // console.log(route) ||
    <Route
      // exact={route.exact}
      // path={route.path}
      // render={() => (
      // pass the sub-routes down to keep nesting
      // <route.component routes={route.routes} />
      // )}
      {...route}
      component={props => {
        const MyComponent = withLoadable(import(`../pages/${route.component}/`))
        return <MyComponent {...props} routes={route.routes} />
      }}
    />
  )
}

export default RouteWithSubRoutes
