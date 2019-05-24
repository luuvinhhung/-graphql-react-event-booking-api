import React, { Component } from 'react'
import SiderLayout from './sider/SiderLayout'
import MainNavigation from '../components/Navigation/MainNavigation'

import { Layout } from 'antd'

const { Header, Content } = Layout
class MainContent extends Component {
  render() {
    return (
      <>
        <Layout>
          <SiderLayout />
          <Layout style={{ height: '100vh' }}>
            <Header style={{ padding: 0 }}>
              {/* <Icon
                  className='trigger'
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                /> */}
              <MainNavigation />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 480
              }}
            >{/* <Switch>
                    {token && <Redirect from='/' to='/events' exact />}
                    {token && <Redirect from='/auth' to='/events' exact />}
                    <Route path='/auth' component={AuthPage} />
                    <Route path='/events' component={EventsPage} />
                    {token && <Route path='/bookings' component={BookingsPage} />}
                    <Redirect to='/auth' exact />
                  </Switch> */}
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </>
    )
  }
}
export default MainContent
