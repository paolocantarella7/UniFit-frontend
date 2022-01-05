
import React from 'react';
import ConnectedHeader from '../../components/header/header';
import { AccountConsumer } from '../../providers/accountProvider'
import Footer from '../../components/footer/footer'
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './recovery.scss';
import Loading from '../../components/loading/loading';


// Login page
class Recovery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      username: "",
      pass: "",
      pass1:"",
      errors: {},
      loading:false,
      token: this.props.match.params.token
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
    if (!this.state.pass)
      errors.pass = "Please add new password";
    if (!this.state.pass1)
      errors.pass1 = "Please add password again";
      if (this.state.pass.length < 8) 
      errors.pass = "Password must be 8 characters long!";
      
      if (this.state.pass != this.state.pass1 && this.state.pass.length > 8){
      errors.pass1="Password does not match";
    }
    
    if (errors.pass1 || errors.pass) {
      this.setState({ errors })
      return;
    } else {
      let data = {
        password: this.state.pass,
        token:this.state.token
      }
      this.setState({loading:true})
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/reset/confirm/`, {
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
        toast.success('Password change successfull, Please login', {
          autoClose: 3000,
          className: "successToast"
        })
        setTimeout(function () {
          window.location.href = '/login';
      }, 3000);
      }
      ).catch(error => {
        this.setState({loading:false})
        let errors = {
          invalid: "Something went wrong, Try agin later"
        }
        toast.error('Something went wrong, Try agin later', {
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
            <h3 className="text-center text-white">Add new password</h3>
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
              <div className="right_top">              <h1 className="heading">Change Password</h1>
                <p className="text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
              </div>
              <div className="right_bottom">
                <form method="post" onSubmit={this.formSubmit}>
                  <div className="change">
                    <div className="input_icons">
                      <i class="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <input
                      type="password"
                      name="pass"
                      placeholder="New Password"
                      className="effect-8"
                      value={this.state.pass}
                      onChange={this.handleChange}
                      onBlur={this.validate} />
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
                  <div className="change">
                    <div className="input_icons">
                      <i class="fa fa-lock" aria-hidden="true"></i>
                    </div>
                    <input
                      type="password"
                      name="pass1"
                      placeholder="Confirm Password"
                      onBlur={this.validate}
                      value={this.state.pass1}
                      onChange={this.handleChange}
                      className="effect-8" />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.pass1
                      ? <p className="errmsg">{this.state.errors.pass1}</p>
                      : ''
                    }
                  </div>
                  <button className="login_btn">Change Password</button>
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

export default Recovery;