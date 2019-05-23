import React from 'react'
import './App.css'
import Root from './pages/root'

class App extends React.Component {
  // state = {
  //   token: null,
  //   userId: null
  // }
  // login = (token, userId, tokenExtokenExpiration) => {
  //   this.setState({ token: token, userId: userId })
  // }
  // logout = () => { this.setState({ token: null, userId: null }) }
  render () {
    return (
      <Root />
    )
  }
}

export default App
