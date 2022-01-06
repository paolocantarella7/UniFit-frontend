import React from 'react';
import ConnectedHeader from '../../components/header/header';
import { AccountConsumer } from '../../providers/accountProvider'
import Footer from '../../components/footer/footer'
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.scss';
import Loading from '../../components/loading/loading';


// Login page
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: false,
      username: "",
      pass: "",
      errors: {},
      loading:false,
      pippo: false
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
      let data = {
        username: this.state.username,
        password: this.state.pass
      }
      this.setState({loading:true})
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        } else
          return response.json();
      }
      ).then(user => {
        this.setState({loading:false})
        if (user.role === 'doctor' && user.is_verified) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          let { history } = this.props;
          this
            .props
            .updateAccount(user)

          history.push({ pathname: `/doctordetail/${user.id}` });
          toast.success(`Welcome ${user.username}`, {
            autoClose: 2000,
            className: "successToast"
          })
        } else {
          toast.error('Your account is not verified.', {
            autoClose: 3000,
            className: "errorToast"
          })
        }
        
      }).catch(error => {
        this.setState({loading:false})
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
        <div>
          <ConnectedHeader {...this.props} />
          <div className="doctorSearch loginSignupTop">
            <h3 className="text-center text-white">Login</h3>
          </div>
          <div className="signup_main row">
            <div className="left_section col-md-6 col-lg-6 col-sm-12 col-12">
              <span className="img_span">
                <img src='/img/scope1.png' alt="stethoscope" />
              </span>
              <div>
                <h1 className="p-2 m-0">
                  <span className="welcome_to">Welcome to <span className="medical"> Medical Tourism</span></span>
                </h1>
                <p className="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="p-2 outer_div">
                  <Link
                    to={`/signup`}
                    className="left_signup_btn nav-link login d-flex justify-content-center">Signup</Link>
                </div>
              </div>
            </div>
            <div className="signup_right col-md-6 col-lg-6 col-sm-12 col-12">
              <div className="right_top">
                <h1 className="heading">Login Account</h1>
                <p className="text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
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
                    className="nav-link login d-flex justify-content-start forget_pass_btn">Forgot password</Link>
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
          </div>
          {
            this.state.loading ? <Loading />:''
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