import React, { Component } from 'react'
import RouteWithSubRoutes from '../../utils/RouteWithSubRoutes'
import { Switch, Redirect } from 'react-router-dom'
import MainContent from '../MainContent'

export class Home extends Component {
  render () {
    const { routes } = this.props
    // console.log(routes)
    // truyen Switch vao MainContent nhu props.children
    return (
      <>
        <MainContent>
          <Switch>
            {routes &&
              routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
                // console.log(route)
              ))}
            <Redirect to='/home' />
          </Switch>
        </MainContent>
      </>
    )
  }
}

export default Home
