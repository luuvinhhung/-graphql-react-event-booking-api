import React, { Component } from 'react'
import { Spin } from 'antd'
import AuthContext from '../context/auth.context'
class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: []
  }
  isActive = true
  static contextType = AuthContext;
  componentDidMount() {
    this.fetchBookings()
  }
  fetchBookings = () => {
    this.setState({ isLoading: true })
    const requestBody = {
      query: `
          query {
            bookings {
              _id
              createdAt
              event {
                _id
                title
                date
              }
            }
          }
        `
    }
    const token = this.context.token
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then(resData => {
        // console.log(resData)
        const bookings = resData.data.bookings
        console.log(bookings)
        if (this.isActive) {
          this.setState({
            bookings,
            isLoading: false
          })
        }
      })
      .catch(err => {
        console.log(err)
        if (this.isActive) {
          this.setState({ isLoading: false })
        }
      })
  }
  componentWillUnmount() {
    this.isActive = false
  }
  render() {
    const { bookings } = this.state
    return (
      <>
        {this.state.isLoading ?
          <div style={{ textAlign: 'center' }}>
            <Spin tip="Loading...">
            </Spin>
          </div>
          : <ul>
            {bookings.map(booking => {
              return <li key={booking._id}>{booking.event.title}</li>
            })}
          </ul>}
      </>

    )
  }
}
export default BookingsPage
