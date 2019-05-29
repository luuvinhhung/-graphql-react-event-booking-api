import { gql } from 'apollo-server-express'
export default gql`
  extend type Query {
    events: [Event!]!
  }
  extend type Mutation {
    createEvent(eventInput: EventInput): Event
  }
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }
  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
`
