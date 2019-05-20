import React from 'react'
import { Modal } from 'antd'
const modal = (props) => {
  return (
    <Modal
      title={props.title}
      centered
      visible={props.modalVisible}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      <section className='modal_content'>{props.children}</section>
    </Modal>
  )
}
export default modal
