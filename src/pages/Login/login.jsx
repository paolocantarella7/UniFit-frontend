import React from 'react';
import ConnectedHeader from '../../components/header/header';
import { AccountConsumer } from '../../providers/accountProvider'
import Footer from '../../components/footer/footer'
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.scss';
import Loading from '../../components/loading/loading';
import Server from '../../config.json';

// Login page
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: false,
      username: "",
      pass: "",
      errors: {},
      loading: false,
      user: {},
    }
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }
  formSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!this.state.username)
      errors.username = "Please enter the user name";
    if (!this.state.pass)
      errors.pass = "Please enter the password"

    if (errors.username || errors.pass) {
      this.setState({ errors })
      return;
    } else {
      var data = new FormData()

      data.append('email', this.state.username)
      data.append('password', this.state.pass)
    }
    this.setState({ loading: true })

    var url = Server.API_URL + "user/login"

    fetch(url, {
      method: 'POST',
      body: data
    }).then(response =>  response.json()
    ).then(responseJson => {
      
      console.log(responseJson.utente)

      //this.setState({ loading: false })

      if (responseJson.utente.isAdmin === 1 ) {
        
        localStorage.setItem('currentUser', JSON.stringify(responseJson.utente))
        localStorage.setItem('isLogged' , true)
        
        window.location.href = 'http://localhost:3000/adminArea'


      } else {
        console.log("gg flutter")
        window.location.href = 'http://localhost:3000/seiunostronzo'

      }

    }).catch(error => {
      this.setState({ loading: false })
      let errors = {
        invalid: "Invalid username or password"
      }
      toast.error('Invalid User Name Or Password', {
        autoClose: 3000,
        className: "errorToast"
      })
      this.setState({ errors })
    })
  }


  render() {
    if (this.props.currentUser) {
      const exp_time = this.props.currentUser.password_expiration
      const current_time = new Date().toISOString()
      const d1 = new Date(exp_time),
        d2 = new Date(current_time)
      if (d1.getTime() > d2.getTime()) {
        return <Redirect to="/" />
      } else {
        localStorage.removeItem('currentUser')
        return <Redirect to="/login" />
      }
    } else {
      return (
        <div className="pb-4">
          <ConnectedHeader {...this.props} />
          <div className="signup_right mx-auto pb-5 my-5 rounded">
            <div className="right_top">
              <h1 className="heading">Login</h1>
            </div>
            <div className="right_bottom">
              <form method="post" onSubmit={this.formSubmit}>
                <div className="change">
                  <div className="input_icons">
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="effect-8"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onBlur={this.validate} />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
                <div className="error_div">
                  {this.state.errors.username
                    ? <p className="errmsg">{this.state.errors.username}</p>
                    : ''
                  }
                </div>

                <div className="change">
                  <div className="input_icons">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </div>
                  <input
                    type="password"
                    name="pass"
                    placeholder="Password"
                    onBlur={this.validate}
                    value={this.state.pass}
                    onChange={this.handleChange}
                    className="effect-8" />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
                <div className="error_div">
                  {this.state.errors.pass
                    ? <p className="errmsg">{this.state.errors.pass}</p>
                    : ''
                  }
                </div>
                <div className="pb-2">
                  <Link
                    to={`/recover`}
                    className="nav-link login d-flex justify-content-start forget_pass_btn">Password dimenticata?</Link>
                </div>
                <button className="login_btn">LOGIN</button>
              </form>
              <div className="final_error">
                {this.state.errors.invalid
                  ? <p className="errmsg">{this.state.errors.invalid}</p>
                  : ''
                }
              </div>
            </div>
          </div>
          {
            this.state.loading ? <Loading /> : ''
          }
          <Footer />
        </div>
      )
    }

  }
}
const ConnectedLogin = props => (
  <AccountConsumer>
    {({ currentUser, updateAccount }) => (<Login {...props} currentUser={currentUser} updateAccount={updateAccount} />)}
  </AccountConsumer>
)
export default ConnectedLogin;