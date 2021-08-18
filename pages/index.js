import React, { Component } from 'react'
import { Cookies } from 'react-cookie'
import axios from 'axios'

import Navigation from '../components/Navigation'
import { login } from '../utils/auth'

// set up cookies
const cookies = new Cookies()

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: cookies.get('token') || null,
      error: '',
      email: null,
      password: null,
    }
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onLoginClick = async e => {
    /* eslint-disable no-console */
    e.preventDefault()
    try {
      const { email, password } = this.state
      const url = `${process.env.API_URL}/api/login`
      const response = await axios.post(url, {
        email,
        password,
      })
      const { token } = response.data
      await login({token})
      this.setState({
        token,
        error: null,
      })
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
      this.setState({ error: error.message })
    }
  }

  render() {
    return (
      <div>
        <h1>Main page</h1>
        {!this.state.token &&
          <form onSubmit={(e) => this.onLoginClick(e)}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="user@domain.tld"
              onChange={(e) => this.onInputChange(e)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="password"
              onChange={(e) => this.onInputChange(e)}
            />
            <button type="submit">Login</button>
            <p>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        }
        {this.state.token &&
          <p>Token: {this.state.token}</p>
        }
        
      </div>
    )
  }
}
