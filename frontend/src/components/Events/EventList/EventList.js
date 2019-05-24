import React from 'react'
import './EventList.css'
// import EventItem from './EventItem/EventItem'
import moment from 'moment'
import { Table, Button } from 'antd'
const columns = [
  {
    title: 'Name',
    dataIndex: 'event.title',
    defaultSortOrder: 'ascend',
    render: text => <a href='javascript:;'>{text}</a>,
    sorter: (a, b) => a.event.title - b.event.title
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
    title: 'Action',
    render: (text, record) => (
      // <span>
      //   {/* <a href='javascript:;'>Invite {record.name}</a> */}
      //   {/* <Divider type='vertical' /> */}
      //   <a href='javascript:;'>Join</a>
      // </span>
      <Button type='primary'>JOIN</Button>
    )
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
  // return (
  //   <ul className='event__list'>
  //     {props.events.map(event => {
  //       return <EventItem
  //         key={event._id}
  //         eventId={event._id}
  //         event={event}
  //         userId={props.authUserId}
  //         creatorId={event.creator._id}
  //         onDetail={props.onViewDetail} />
  //     })}
  //   </ul>
  // )
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Avaiable Events</h1>
      <Table columns={columns} dataSource={data} pagination={pagination} />
    </>
  )
}
export default EventList
