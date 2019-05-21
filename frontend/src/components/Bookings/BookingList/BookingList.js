import React from 'react'
import { List, Button } from 'antd'
// import { Calendar } from 'react-feather'
const BookingList = props => (
  <List style={{ textAlign: 'center' }}
    itemLayout='horizontal'
    dataSource={props.bookings}
    renderItem={booking => (
      <List.Item style={{ width: '35rem', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
        {/* <List.Item
          title={<p style={{ fontWeight: 'bold' }}>{booking.event.title}</p>}
          description={<><Calendar /> <p> {new Date(booking.createdAt).toLocaleDateString()}</p></>}
        /> */}
        <div>
          <span style={{ fontWeight: 'bold' }}>{booking.event.title}: </span> {new Date(booking.createdAt).toLocaleDateString()}
        </div>
        <div>
          <Button size={'small'}
            onClick={props.onDelete.bind(this, booking._id)}
          >Cancel</Button>
        </div>
      </List.Item>
    )}
  />
)
export default BookingList
