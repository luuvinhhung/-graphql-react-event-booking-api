import React, { Component } from 'react'
import './Events.scss'
import moment from 'moment'
import { withApollo } from 'react-apollo'
import { Button, Input, DatePicker, Spin } from 'antd'
import Modal from '../../components/Modal/modal'
// import AuthContext from '../context/auth.context'
import EventList from '../../components/Events/EventList/EventList'
import { eventsQuery, createEvent, bookEvent } from '../../graphql/queries/eventsQueries'

const { TextArea } = Input

class EventsPage extends Component {
  state = {
    modalVisible: false,
    events: [],
    isLoading: false,
    selectedEvent: null,
    modelBookingVisible: false
  }
  // static contextType = AuthContext
  constructor (props) {
    super(props)
    this.titleEl = React.createRef()
    this.priceEl = React.createRef()
    this.dateEl = React.createRef()
    this.descriptionEl = React.createRef()
    this.date = ''
    this.token = window.localStorage.getItem('access-token')
    this.userId = window.localStorage.getItem('userId')
  }
  componentDidMount () {
    this.fetchEvents()
  }
  togglemodalVisible = () => {
    this.setState(prevState => {
      return { modalVisible: !prevState.modalVisible }
    })
  }
  togglemodalBookingVisible = () => {
    this.setState(prevState => {
      return {
        modelBookingVisible: !prevState.modelBookingVisible,
        selectedEvent: null
      }
    })
  }
  submitHandle = () => {
    this.togglemodalVisible()
    const title = this.titleEl.current.state.value
    const price = +this.priceEl.current.state.value
    const date = this.dateEl.current.picker.state.value.toISOString()
    const description = this.descriptionEl.current.textAreaRef.value
    const { client } = this.props
    client
      .mutate({
        mutation: createEvent,
        variables: {
          title: title,
          desc: description,
          price: price,
          date: date
        }
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedEvents = [...prevState.events]
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            date: resData.data.createEvent.date,
            price: resData.data.createEvent.price,
            creator: {
              _id: this.userId
            }
          })
          return { events: updatedEvents }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchEvents () {
    this.setState({ isLoading: true })
    // truyen client apollo qua props
    // HACK: apollo client
    this.props.client
      .query({ query: eventsQuery })
      .then(resData => {
        this.setState({
          events: resData.data.events,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }
  showDetailHandler = eventId => {
    this.togglemodalBookingVisible()
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId)
      // console.log(selectedEvent.title)
      return { selectedEvent: selectedEvent }
    })
  }
  bookEventHandler = () => {
    this.togglemodalBookingVisible()
    if (!this.token) {
      this.setState({ selectedEvent: null })
      return
    }
    console.log(this.state.selectedEvent._id)
    this.props.client
      .mutate({
        mutation: bookEvent,
        variables: {
          eventId: this.state.selectedEvent._id
        }
      })
      .then(resData => {
        console.log(resData)
        this.setState({ selectedEvent: null })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    const { modalVisible } = this.state
    const dateFormat = 'DD/MMM/YYYY'
    const { events } = this.state
    return (
      <>
        <Modal
          title={'Create Event'}
          modalVisible={modalVisible}
          onCancel={this.togglemodalVisible}
          onOk={this.submitHandle}
        >
          <form>
            <div className='form-control'>
              <label htmlFor='title'>Title</label>
              <Input type='text' id='title' ref={this.titleEl} />
            </div>
            <div className='form-control'>
              <label htmlFor='price'>Price</label>
              <Input min={'0'} type='number' id='price' ref={this.priceEl} />
            </div>
            <div className='form-control'>
              <label htmlFor='date'>Date</label>
              <DatePicker
                defaultValue={moment(new Date(), dateFormat)}
                format={dateFormat}
                // onChange={(date, dateString) => this.date = dateString }
                ref={this.dateEl} />
            </div>
            <div className='form-control'>
              <label htmlFor='description'>Description</label>
              <TextArea
                placeholder='Introduce your event'
                autosize={{ minRows: 3, maxRows: 6 }}
                ref={this.descriptionEl}
                onChange={this.testArea}
              />
            </div>
          </form>
        </Modal>
        {this.state.selectedEvent && <Modal
          title={this.state.selectedEvent.title}
          modalVisible={this.state.modelBookingVisible}
          onCancel={this.togglemodalBookingVisible}
          onOk={this.bookEventHandler}
        >
          <h1>{this.state.selectedEvent.title}</h1>
          <p>{this.state.selectedEvent.price}</p>
        </Modal>}
        {this.token &&
          (<div className='events-control'>
            <h2>Share your own Events</h2>
            <Button onClick={this.togglemodalVisible} type='primary' block>Create Event</Button>
          </div>)}
        {this.state.isLoading
          ? <div style={{ textAlign: 'center' }}>
            <Spin tip='Loading...' />
          </div>
          : <EventList events={events} authUserId={this.userId} onViewDetail={this.showDetailHandler} />}
      </>
    )
  }
}
export default withApollo(EventsPage)
