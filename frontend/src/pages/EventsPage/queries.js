import gql from 'graphql-tag'

// TODO: event queries
export const eventsQuery = gql`
  query {
    events {
      _id
      title
      description
      date
      price
      creator {
        _id
        email
      }
    }
  }
`
export const createEvent = gql`
    mutation($title: String!, $desc: String!,
      $price: Float!, $date: String!) {
      createEvent(eventInput: { title: $title, description: $desc, price: $price, date: $date }) {
        _id
        title
        description
        date
        price
      }
    } 
`
export const bookEvent = gql`
  mutation($eventId: ID!) {
    bookEvent(eventId: $eventId) {
    _id
    createdAt
    updatedAt
    }
  }
`
