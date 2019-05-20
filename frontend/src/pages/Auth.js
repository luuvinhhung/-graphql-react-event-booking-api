import React, { Component } from 'react'
import './Auth.css'
import 'antd/dist/antd.css'
import { Button, Input } from 'antd'

import AuthContext from '../context/auth.context'

class AuthPage extends Component {
  constructor(props) {
    super(props)
    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
    this.state = {
      isLogin: true
    }
  }
  static contextType = AuthContext
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
        query {
          login(email: "${email}", password: "${password}"){
            userId
            token
          }
        }
      `
    }
    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
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
        console.log(resData)
        if (resData.data.login.token) {
          // console.log(this.context)
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          )
        }
      })
      .catch(err => {
        console.log(err)
      })

  }
  render() {
    const { isLogin } = this.state
    return (
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
    )
  }
}
export default AuthPage
