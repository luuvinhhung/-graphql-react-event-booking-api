import React from 'react'
import './App.css'
import { ApolloProvider } from 'react-apollo'
import client from './utils/ApolloClient'
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
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    )
  }
}

export default App
