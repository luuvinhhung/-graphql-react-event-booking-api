import gql from 'graphql-tag'

// TODO: booking queries
export const bookingsQuery = gql`
  query {
    bookings {
      _id
      createdAt
      event {
        _id
        title
        price
        date
      }
    }
  }
`
export const cancelBooking = gql`
  mutation ($id: ID!) {
    cancelBooking(bookingId: $id) {
      _id
      title
    }
  }
`
