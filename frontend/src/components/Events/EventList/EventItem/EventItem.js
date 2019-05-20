import React from 'react'
import './EventItem.css'
import { Button } from 'antd'
const EventItem = props => {
  return <li className='events__list-item' key={props.eventId}>
    <div>
      <h1>{props.event.title}</h1>
      <h3>{`$ ${props.event.price} - ${new Date(props.event.date).toLocaleDateString()}`}</h3>
    </div>
    <div style={{ textAlign: 'center', marginTop: 10 }}>
      { props.creatorId === props.userId ? <p>Your the owner this event</p>
        : <Button
          type='primary'
          onClick={props.onDetail.bind(this, props.eventId)}
        >View Details</Button> }
    </div>
  </li>
}
export default EventItem
