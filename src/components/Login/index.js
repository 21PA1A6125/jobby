import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = async jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({showSubmitError: true, errorMsg: error})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-div">
        <form onSubmit={this.onClickSubmit} className="login-container">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-logo"
          />
          <label htmlFor="username">USERNAME</label>
          <div className="input-div-login">
            <input
              id="username"
              onChange={this.onChangeUsername}
              type="text"
              value={username}
              placeholder="Username"
              className="input-control-login"
            />
          </div>
          <label htmlFor="username">PASSWORD</label>
          <div className="input-div-login">
            <input
              id="password"
              value={password}
              onChange={this.onChangePassword}
              type="password"
              placeholder="Password"
              className="input-control-login"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
