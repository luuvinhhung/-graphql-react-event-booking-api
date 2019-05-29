import React from 'react'
import './EventList.scss'
// import EventItem from './EventItem/EventItem'
import moment from 'moment'
import { Table, Button } from 'antd'

// WARNING: chuyen tu EventList -> ant design table xoa EventItem
const columns = [
  {
    title: 'Name',
    dataIndex: 'event.title',
    defaultSortOrder: 'ascend',
    render: text => <a href='google.com'>{text}</a>
  },
  {
    title: 'Price',
    dataIndex: 'event.price',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => parseFloat(a.event.price) - parseFloat(b.event.price)
  },
  {
    title: 'Date',
    dataIndex: 'event.date',
    render: text => new Date(text).toLocaleDateString(),
    sorter: (a, b) => moment(a.event.date).valueOf() - moment(b.event.date).valueOf(),
    sortDirections: ['descend', 'ascend']
  },
  {
    // HACK: align cho column
    title: 'Action',
    dataIndex: 'onDetail',
    align: 'center',
    render: (text, record) => {
      return record.creatorId === record.userId
        ? <p>Your the owner this event</p>
        : <Button onClick={record.onDetail.bind(this, record.eventId)} shape='round' type='primary'>Join now!</Button>
    }

  }
]

const EventList = (props) => {
  const pagination = { position: 'bottom', pageSize: 5 }
  const data = props.events.map(event => {
    return {
      key: event._id,
      eventId: event._id,
      event: event,
      userId: props.authUserId,
      creatorId: event.creator._id,
      onDetail: props.onViewDetail
    }
  })
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Avaiable Events</h1>
      <Table columns={columns} dataSource={data} pagination={pagination} />
    </>
  )
}
export default EventList
