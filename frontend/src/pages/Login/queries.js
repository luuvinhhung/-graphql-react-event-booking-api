import gql from 'graphql-tag'

// TODO: signup queries
export const login = gql`
  query ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
    }
  }
`
