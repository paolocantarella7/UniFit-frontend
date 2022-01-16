import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import Server from "../../config.json";

// Login page
class Recover2 extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confermaPassword: "",
      errors: {},
      loading: false,
      user: {},
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  formSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!this.state.password)
      errors.password = "Inserire la nuova password";
    if (!this.state.confermaPassword)
      errors.confermaPassword = "Inserire la conferma della password"
    if (errors.password || errors.confermaPassword) {
      this.setState({ errors })
      return;
    } else {
      var data = new FormData()
      let user = localStorage.getItem('currentUser')
      user = JSON.parse(user);
      data.append('password', this.state.password)
      data.append('passwordConferma', this.state.confermaPassword)
    }
    this.setState({ loading: true })

    var url = Server.API_URL + "reset-password?token="+this.props.match.params.token
    fetch(url, {
      method: 'POST',
      body: data
    }).then(response =>  response.json()
    ).then(responseJson => {
      
      this.setState({ loading: false })
      console.log(responseJson)
      if (responseJson.codice === 200){    
        localStorage.removeItem("currentUser");
        localStorage.setItem("isLogged", false);
        window.location.assign(Server.FRONT_URL);
      }
    })
  }

  render() {
    if (localStorage.getItem("isLogged") === "true") {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin) {
        return <Redirect to="/adminArea" />;
      } else {
        return <Redirect to="/home" />;
      }
    } else {
      return (
        <div className="pb-4">
          <ConnectedHeader />
          <div className="signup_right mx-auto pb-5 my-5 rounded">
            <div className="right_top">
              <h1 className="heading">Recupero password</h1>
            </div>
            <div className="right_bottom">
              <form method="post" onSubmit={this.formSubmit}>
                <div className="change">
                  <div className="input_icons">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onBlur={this.validate}
                    value={this.state.password}
                    onChange={this.handleChange}
                    className="effect-8"
                  />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
                <div className="error_div">
                  {this.state.errors.password ? (
                    <p className="errmsg">{this.state.errors.password}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="change">
                  <div className="input_icons">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </div>
                  <input
                    type="password"
                    name="confermaPassword"
                    placeholder="Conferma password"
                    onBlur={this.validate}
                    value={this.state.confermaPassword}
                    onChange={this.handleChange}
                    className="effect-8"
                  />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
                <div className="error_div">
                  {this.state.errors.confermaPassword ? (
                    <p className="errmsg">{this.state.errors.confermaPassword}</p>
                  ) : (
                    ""
                  )}
                </div>
                <button className="login_btn">Recupera</button>
              </form>
              <div className="final_error">
                {this.state.errors.invalid ? (
                  <p className="errmsg">{this.state.errors.invalid}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {this.state.loading ? <Loading /> : ""}
          <Footer />
        </div>
      );
    }
  }
}

export default Recover2;
