import React, { Component } from 'react'
import { Spin } from 'antd'
import AuthContext from '../context/auth.context'
import BookingList from '../components/Bookings/BookingList/BookingList'

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: []
  }
  isActive = true
  static contextType = AuthContext
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
                price
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
  deleteBookingHangler = (bookingId) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation {
            cancelBooking(bookingId: "${bookingId}") {
            _id
            title
            }
          }
        `
    };

    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  render() {
    const { bookings } = this.state
    return (
      <>
        {this.state.isLoading ?
          <div style={{ textAlign: 'center', paddingTop: '20%' }}>
            <Spin tip="Loading...">
            </Spin>
          </div>
          : <BookingList bookings={bookings} onDelete={this.deleteBookingHangler} />}
      </>

    )
  }
}
export default BookingsPage
