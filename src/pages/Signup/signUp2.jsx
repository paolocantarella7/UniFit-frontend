import React from 'react';
import ConnectedHeader from '../../components/header/header';
import Footer from '../../components/footer/footer'
import {AccountConsumer} from '../../providers/accountProvider'
import {Redirect, Link} from 'react-router-dom';
import validEmailRegex from '../../emailRegx'
import './signupdoctor.scss'
import {toast} from 'react-toastify';
import Loading from '../../components/loading/loading';

// Signup page for doctors
class SignUp2 extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: false,
      username: '',
      email: '',
      pass: '',
      cpass: '',
      errors: {},
      loading: false
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value})
  }
  validate = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'username':
        errors.username = value.length < 5
          ? 'Username must be 5 characters long!'
          : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value)
          ? ''
          : 'Email is not valid';
        break;
      case 'pass':
        errors.pass = value.length < 8
          ? 'Password length must be greater than or equal to 8'
          : '';
        break;
      case 'cpass':
        errors.cpass = this.state.pass !== value
          ? 'Passwords do not match'
          : '';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value})
  }

  formSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (this.state.username.length < 5) 
      errors.username = "Username must be 5 characters long!"
    if (!validEmailRegex.test(this.state.email)) 
      errors.email = "Email is not valid!"
    if (this.state.pass.length < 8) 
      errors.pass = "Password must be 8 characters long!"
    if (this.state.pass !== this.state.cpass) 
      errors.cpass = "Password not match";
    
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.pass,
      role: 'doctor'
    }
    if (errors.username || errors.email || errors.pass || errors.cpass || !this.state.cpass) {
      this.setState({errors})
      return;
    } else {
      this.setState({loading: true})
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/signup`, {
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
        if (user) {
          this.setState({loading: false})
          toast.success(`Please verify your email verification link sent on ${this.state.email}}`, {autoClose: 2000,className: "errorToast"})
          let {history} = this.props;
          history.push({pathname: `/login`});
        }
      }).catch(error => {
        this.setState({loading: false})
        let errors = {
          invalid: "Username or Email Already Exist"
        }
        this.setState({errors})
        toast.error(`Username or Email Already Exist`, {autoClose: 2000,className: "errorToast"})
      })
    }

  }

  render() {
    if (this.props.currentUser) 
      return <Redirect to="/"/>
    else {
      return (
        <div>
          <ConnectedHeader {...this.props}/>
          <div className="signup_main">
            <div className="signup_right mx-auto">
              <div className="right_top">
                <h1 className="heading">Dicci qualcosa in più su di te</h1>
              </div>
              <div className="right_bottom">
                <form method="post" onSubmit={this.formSubmit}>
                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <input
                      type="text"
                      name="cf"
                      placeholder="Codice fiscale"
                      className="effect-8"
                      onBlur={this.validate}
                      required
                      value={this.state.email}
                      onChange={this.handleChange}/>

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
                      <i className="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Indirizzo"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.username}
                      onChange={this.handleChange}
                      onBlur={this.validate}></input>
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
                      <i className="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <input
                      type="text"
                      name="surname"
                      placeholder="Telefono"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.username}
                      onChange={this.handleChange}
                      onBlur={this.validate}></input>
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

                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <input
                      type="text"
                      name="surname"
                      placeholder="Data di nascita"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.username}
                      onChange={this.handleChange}
                      onBlur={this.validate}></input>
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
                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <input
                      type="text"
                      name="surname"
                      placeholder="Nazionalità"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.username}
                      onChange={this.handleChange}
                      onBlur={this.validate}></input>
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
                  <button className="signup_btn">Registrati</button>
                  
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
          {this.state.loading
            ? <Loading/>
            : ''
}
          <Footer/>
        </div>
      )
    }

  }
}
export default SignUp2;