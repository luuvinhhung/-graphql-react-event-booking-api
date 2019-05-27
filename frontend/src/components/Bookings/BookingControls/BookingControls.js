import React from 'react'
import './BookingsControls.scss'
import { Button } from 'antd'
const BookingsControls = (props) => {
  const classes = 'button'
  return (
    <>
      <Button className={props.activeOutputType === 'list' ? classes + ' active' : classes}
        // className={props.activeOutputType === 'list' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'list')}>List</Button>
      <Button className={props.activeOutputType === 'chart' ? classes + ' active' : classes}
        onClick={props.onChange.bind(this, 'chart')}>Chart</Button>
    </>
  )
}
export default BookingsControls
