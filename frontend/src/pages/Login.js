import React, { Component } from 'react'
import './Login.css'
import 'antd/dist/antd.css'
import { Button, Input, Row, Col } from 'antd'

import Auth from '../context/Authentication'

class AuthPage extends Component {
  constructor(props) {
    super(props)
    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
    this.state = {
      isLogin: true
    }
  }
  switchModeHandle = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin }
    })
  }
  submitHandle = (e) => {
    e.preventDefault()
    // const email = this.emailEl.current.state.value
    // const password = this.passwordEl.current.state.value
    const email = 'hung@gmail.com'
    const password = '123'
    // console.log(email, password)
    if (email.trim().lenght === 0 || password.trim().length === 0) {
      console.log('email or password is empty')
      return
    }
    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password){
            userId
            token
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    }
    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      }
    }
    // console.log(requestBody.query)
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
        if (resData.data.login.token) {
          Auth.authenticate(() => {
            localStorage.setItem('access-token', resData.data.login.token)
            localStorage.setItem('userId', resData.data.login.userId)
            this.props.history.push('/home')
            // this.setState({ loading: false, spin: false })
          })
        }
      })
      .catch(err => {
        console.log(err)
      })

  }
  render() {
    const { isLogin } = this.state
    return (
      <>
        <Row id="layout-login">
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 16, offset: 8 }}
            md={{ span: 14, offset: 10 }}
            lg={{ span: 12, offset: 12 }}
            xl={{ span: 7, offset: 17 }}
          >
            <form className='auth-form' onSubmit={this.submitHandle}>
              <div className='form-control'>
                <label htmlFor='email'>E-mail</label>
                <Input type='email' id='email' ref={this.emailEl} />
              </div>
              <div className='form-control'>
                <label htmlFor='password'>Password</label>
                <Input type='password' id='password' ref={this.passwordEl} />
              </div>
              <div className='form-actions'>
                <Button htmlType="submit"
                  disabled={isLogin ? false : true}
                  // onClick={this.switchModeHandle}
                  type='primary'>
                  Login
          </Button>
              </div>
            </form>
          </Col>
        </Row>
      </>

    )
  }
}
export default AuthPage
