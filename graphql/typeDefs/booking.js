import { gql } from 'apollo-server-express'
// TODO: chia ra events, bookings
export default gql`
  extend type Query {
    bookings: [Booking!]!
  }
  extend type Mutation {
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`
