import React, { Component } from 'react'
import './Events.css'
import moment from 'moment';
import { Button, Input, DatePicker } from 'antd'
import Modal from '../components/Modal/modal'
import AuthContext from '../context/auth.context'

const { TextArea } = Input

class EventsPage extends Component {
  state = {
    modalVisible: false,
    events: []
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
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData)
        this.fetchEvents()
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchEvents() {
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
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        // console.log(resData)
        const events = resData.data.events
        console.log(events)
        this.setState({
          events
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { modalVisible } = this.state
    const dateFormat = 'DD/MMM/YYYY'
    const eventList = this.state.events.map(event => {
      return <li className='events__list-item' key={event._id}>{event.title}</li>
    })
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
        {this.context.token &&
          (<div className='events-control'>
            <h2>Share your own Events</h2>
            <Button onClick={this.togglemodalVisible}>Create Event</Button>
          </div>)}
        <ul className='events__list'>
          {eventList}
        </ul>
      </>
    )
  }
}
export default EventsPage
