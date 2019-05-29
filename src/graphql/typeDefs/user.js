import { gql } from 'apollo-server-express'
export default gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
    login(email: String!, password: String!): AuthData!
  }
  extend type Mutation {
    createUser(userInput: UserInput): User
    # signIn(email: String!, password: String!): User @guest
    # signOut: Boolean @auth
  }
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String
    createdEvents: [Event!]
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input UserInput {
    email: String!
    password: String!
  }
`
