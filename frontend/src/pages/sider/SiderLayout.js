import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import './SliderLayout.scss'
import { Link } from 'react-router-dom'
import { siderRoutes } from '../../routes'

const { Sider } = Layout

class SiderLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    return (
      <Sider width={200}
        theme='light'
        style={{ background: 'white' }}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}>
        <Menu theme='light' mode='inline' defaultSelectedKeys={['2']} justify='center' align='left'>
          <div style={{ height: 60, paddingTop: 20, fontSize: 20, textAlign: 'center', justifyItems: 'center' }}>
            <Icon className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </div>
          {/* tao item trong menu tu router click chuyen trang /home/events(/bookings) */}
          {siderRoutes &&
            siderRoutes.map((siderRoute, i) => (
              <Menu.Item style={{ height: '50px' }} key={siderRoute.path}>
                <Link to={siderRoute.path}>
                  <Icon style={{ fontSize: '1rem' }} type={siderRoute.icon} theme='twoTone' />
                  <span>{siderRoute.label.toUpperCase()}</span>
                </Link>
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
    )
  }
}

export default SiderLayout
