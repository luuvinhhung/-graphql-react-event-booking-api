import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
// import { onError } from 'apollo-link-error'
// import { setContext } from 'apollo-link-context'

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3001/graphql'
})
const client = new ApolloClient({
  cache,
  link
})
export default client
