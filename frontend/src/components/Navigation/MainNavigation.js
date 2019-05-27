import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Auth from '../../context/Authentication'
import { Button } from 'antd'

// import AuthContext from '../../context/auth.context'

import './MainNavigation.css'

class mainNavigation extends Component {
  constructor (props) {
    super(props)
    this.token = window.localStorage.getItem('access-token')
  }
  logoutHandler = () => {
    Auth.logout(() => {
      window.localStorage.removeItem('access-token')
      this.props.history.push('/login')
      // this.props.client.resetStore()
    })
  }
  render () {
    return (
      <>
        {
          <header className='main-navigation'>
            <div className='main-navigation__logo'>
              <h1>EasyEvent</h1>
            </div>
            <nav className='main-navigation__items'>
              {this.token && (
                <Button onClick={this.logoutHandler}>Logout</Button>
              )}
            </nav>
          </header>
        }
      </>
    )
  }
}

export default withRouter(mainNavigation)
