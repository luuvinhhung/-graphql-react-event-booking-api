import React, { Component } from 'react'
import './Events.css'
import moment from 'moment'
import { Button, Input, DatePicker, Spin } from 'antd'
import Modal from '../components/Modal/modal'
import AuthContext from '../context/auth.context'
import EventList from '../components/Events/EventList/EventList'

const { TextArea } = Input

class EventsPage extends Component {
  state = {
    modalVisible: false,
    events: [],
    isLoading: false,
    selectedEvent: null,
    modelBookingVisible: false
  }
  static contextType = AuthContext
  constructor(props) {
    super(props)
    this.titleEl = React.createRef()
    this.priceEl = React.createRef()
    this.dateEl = React.createRef()
    this.descriptionEl = React.createRef()
    this.date = ''
  }
  componentDidMount() {
    this.fetchEvents()
  }
  togglemodalVisible = () => {
    // console.log(this.state.modalVisible)
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
    const price = this.priceEl.current.state.value
    const date = this.dateEl.current.picker.state.value.toISOString()
    const description = this.descriptionEl.current.textAreaRef.value
    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
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
        this.setState(prevState => {
          const updatedEvents = [...prevState.events]
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            date: resData.data.createEvent.date,
            price: resData.data.createEvent.price,
            creator: {
              _id: this.context.userId
            }
          })
          return { events: updatedEvents }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchEvents() {
    this.setState({ isLoading: true })
    const requestBody = {
      query: `
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
    }
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
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
        const events = resData.data.events
        console.log(events)
        this.setState({
          events,
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
      console.log(selectedEvent)
      return { selectedEvent: selectedEvent }
    })
  }
  bookEventHandler = () => {
    this.togglemodalBookingVisible()
    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }
    // console.log(this.state.selectedEvent._id)
    const requestBody = {
      query: `
          mutation {
            bookEvent(eventId: "${this.state.selectedEvent._id}") {
            _id
            createdAt
            updatedAt
            }
          }
        `
    };
    const token = this.context.token
    // console.log(token)
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
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ selectedEvent: null });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { modalVisible } = this.state
    const dateFormat = 'DD/MMM/YYYY'
    const { events } = this.state
    // const eventList = this.state.events.map(event => {
    //   return <li className='events__list-item' key={event._id}>{event.title}</li>
    // })
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
              <Input type='text' id='title' ref={this.titleEl}></Input>
            </div>
            <div className='form-control'>
              <label htmlFor='price'>Price</label>
              <Input min={'0'} type='number' id='price' ref={this.priceEl}></Input>
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
                placeholder="Introduce your event"
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
        </Modal>}
        {this.context.token &&
          (<div className='events-control'>
            <h2>Share your own Events</h2>
            <Button onClick={this.togglemodalVisible}>Create Event</Button>
          </div>)}
        {this.state.isLoading ?
          <div style={{ textAlign: 'center' }}>
            <Spin tip="Loading...">
            </Spin>
          </div>
          : <EventList events={events} authUserId={this.context.userId} onViewDetail={this.showDetailHandler} />}
      </>
    )
  }
}
export default EventsPage
