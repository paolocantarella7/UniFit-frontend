import React from 'react';
import ConnectedHeader from '../../components/header/header';
import { AccountConsumer } from '../../providers/accountProvider'
import Footer from '../../components/footer/footer'
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './recover.scss';
import Loading from '../../components/loading/loading';


// Recovery page
class Recover extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: false,
      email: "",
      pass: "",
      errors: {},
      loading:false
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
    if (!this.state.email)
      errors.email = "Please enter Email";

    if (errors.email) {
      this.setState({ errors })
      return;
    } else {
      let data = {
        email: this.state.email,
      }
      this.setState({loading:true})
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/reset/`, {
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
        toast.success('Password reset link is sent by email, Please check your mail.', {
          autoClose: 3000,
          className: "successToast"
        })
        setTimeout(function () {
          window.location.href = '/login';
      }, 3000);
        
      }
      // ).then(user => {
      //   this.setState({loading:false})
      //   if (user.role === 'doctor' && user.is_verified) {
      //     console.log(user)
      //   } else {
          // toast.error('Your account is not verified.', {
          //   autoClose: 3000,
          //   className: "errorToast"
          // })
      //   }
        
      // }
      ).catch(error => {
        this.setState({loading:false})
        let errors = {
          invalid: "User not found"
        }
        toast.error('User not found', {
          autoClose: 3000,
          className: "errorToast"
        })
        this.setState({ errors })
      })
    }
  }

  render() {
      return (
        <div className="pb-4">
          <ConnectedHeader {...this.props} />
          <div className="signup_main ">
            <div className="signup_right mx-auto pb-5 my-5">
              <div className="right_top">
                <h1 className="heading">Reset Password</h1>
              </div>
              <div className="right_bottom pt-3">
                <form method="post" onSubmit={this.formSubmit}>
                  <div className="change">
                    <div className="input_icons">
                      <i class="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="effect-8"
                      value={this.state.email}
                      onChange={this.handleChange}
                      onBlur={this.validate} />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.email
                      ? <p className="errmsg">{this.state.errors.email}</p>
                      : ''
                    }
                  </div>
                  <button className="login_btn pt-3">Submit</button>
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
          <Footer/>
        </div>
        
      )
    }

  }
const ConnectedRecover = props => (
  <AccountConsumer>
    {({ currentUser, updateAccount }) => (<Recover {...props} currentUser={currentUser} updateAccount={updateAccount} />)}
  </AccountConsumer>
)
export default ConnectedRecover;