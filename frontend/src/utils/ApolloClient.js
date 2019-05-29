import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
// import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

const cache = new InMemoryCache()
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})
const authLink = setContext((_, { headers, ...rest }) => {
  const token = window.localStorage.getItem('access-token')
  const context = {
    ...rest,
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
  return context
})
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, httpLink])
})
export default client
