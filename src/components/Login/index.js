import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', erroMsg: '', error: false}

  componentDidMount() {}

  onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('./')
  }

  getData = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({erroMsg: data.error_msg, error: true})
    }
  }

  loginImageContainer = () => (
    <div className="login-image-container">
      <img
        src="https://res.cloudinary.com/dysfydgi3/image/upload/v1664385004/MINI_PROJECT/loginImage_otsvzj.png"
        alt=""
        className="login-image"
      />
    </div>
  )

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  renderUserName = () => (
    <div className="user-name-container">
      <p className="username">USER NAME</p>
      <input
        type="text"
        className="input-container"
        placeholder="user name"
        onChange={this.onChangeUserName}
      />
    </div>
  )

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassWord = () => (
    <div className="user-name-container">
      <p className="username">USER NAME</p>
      <input
        type="password"
        className="input-container"
        placeholder="password"
        onChange={this.onChangePassword}
      />
    </div>
  )

  onSubmitMyForm = event => {
    event.preventDefault()
    this.getData()
    console.log('submitted')
  }

  render() {
    const {erroMsg, error} = this.state
    return (
      <div className="login-container d-row">
        {this.loginImageContainer()}

        <form className="my-form d-col" onSubmit={this.onSubmitMyForm}>
          <img
            src="https://res.cloudinary.com/dysfydgi3/image/upload/v1664385281/MINI_PROJECT/instaShare_xthfd3.png"
            alt=""
            className="insta-share-image"
          />
          <h1>Insta Share</h1>
          {this.renderUserName()}
          {this.renderPassWord()}
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="error-msg">{error ? erroMsg : ''}</p>
        </form>
      </div>
    )
  }
}

export default Login
