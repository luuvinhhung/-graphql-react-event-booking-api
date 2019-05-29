import React, { Component } from 'react'
import { Spin } from 'antd'
// import AuthContext from '../context/auth.context'
import { withApollo } from 'react-apollo'
import BookingList from '../../components/Bookings/BookingList/BookingList'
import BookingsChart from '../../components/Bookings/BookingChart/BookingChart'
import BookingsControls from '../../components/Bookings/BookingControls/BookingControls'
import { bookingsQuery, cancelBooking } from '../../graphql/queries/bookingsQueries'

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
    outputType: 'list'
  }
  token = window.localStorage.getItem('access-token')
  isActive = true
  // static contextType = AuthContext
  componentDidMount () {
    this.fetchBookings()
  }
  fetchBookings = () => {
    this.setState({ isLoading: true })
    this.props.client.query({ query: bookingsQuery })
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
  }
  componentWillUnmount () {
    this.isActive = false
  }
  deleteBookingHangler = bookingId => {
    this.setState({ isLoading: true })
    this.props.client
      .mutate({
        mutation: cancelBooking,
        variables: {
          id: bookingId
        }
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== bookingId
          })
          return { bookings: updatedBookings, isLoading: false }
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }
  changeOutputTypeHandler = outputType => {
    if (outputType === 'list') {
      this.setState({
        outputType: 'list'
      })
    } else {
      this.setState({
        outputType: 'chart'
      })
    }
  }

  render () {
    let content = <Spin style={{ padding: '30px 50%' }} tip='Loading...' />
    const { bookings } = this.state
    if (!this.state.isLoading) {
      content = (
        <>
          <div style={{ textAlign: 'center', paddingTop: 30 }}>
            <BookingsControls
              activeOutputType={this.state.outputType}
              onChange={this.changeOutputTypeHandler}
            />
            {/* <Button onClick={this.changeOutputTypeHandler.bind(this, 'list')}>List</Button>
            <Button onClick={this.changeOutputTypeHandler.bind(this, 'chart')}>Chart</Button> */}
          </div>
          <div>
            {this.state.outputType === 'list' ? (
              <BookingList
                bookings={bookings}
                onDelete={this.deleteBookingHangler}
              />
            ) : (
              <BookingsChart bookings={bookings} />
            )}
          </div>
        </>
      )
    }
    return <>{content}</>
  }
}
export default withApollo(BookingsPage)
