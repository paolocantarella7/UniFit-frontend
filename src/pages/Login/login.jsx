import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.scss";
import Loading from "../../components/loading/loading";
import Server from "../../config.json";

// Login page
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      pass: "",
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
    if (!this.state.username) errors.username = "Inserire l'email";
    if (!this.state.pass) errors.pass = "Inserire la password";

    if (errors.username || errors.pass) {
      this.setState({ errors });
      return;
    } else {
      var data = new FormData();

      data.append("email", this.state.username);
      data.append("password", this.state.pass);
    }
    this.setState({ loading: true });

    var url = Server.API_URL + "user/login";
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.code ===  400) {
          toast.error("Email o password non corretti", {
            autoClose: 8000,
            className: "errorToast",
          });
        } else if (responseJson.code === 200 ) {
          if (responseJson.utente.isAdmin === 1) {
            localStorage.setItem("isLogged", true);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(responseJson.utente)
            );
            window.location.href = Server.FRONT_URL + "adminArea";
          } else {
            localStorage.setItem("isLogged", true);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(responseJson.utente)
            );
            window.location.href = Server.FRONT_URL + "home";
          }
        }
        this.setState({ loading: false });
      });
  };

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
        <div className="pb-4 page-small ">
          <ConnectedHeader />

          <div className="signup_right mx-auto pb-5 rounded">
            <div className="right_top">
              <h1 className="heading">Login</h1>
            </div>
            <div className="right_bottom">
              <form method="post" onSubmit={this.formSubmit}>
                <div className="change">
                  <div className="input_icons">
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Email"
                    className="effect-8"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onBlur={this.validate}
                  />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
                <div className="error_div">
                  {this.state.errors.username ? (
                    <p className="errmsg font-weight-bold">{this.state.errors.username}</p>
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
                    name="pass"
                    placeholder="Password"
                    onBlur={this.validate}
                    value={this.state.pass}
                    onChange={this.handleChange}
                    className="effect-8"
                  />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
                <div className="error_div">
                  {this.state.errors.pass ? (
                    <p className="errmsg font-weight-bold">{this.state.errors.pass}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="pb-2">
                  <Link
                    to={`/recover`}
                    className="nav-link login d-flex justify-content-start forget_pass_btn text-white"
                  >
                    Password dimenticata?
                  </Link>
                </div>
                <button className="login_btn">LOGIN</button>
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

          <Footer className="navbar fixed-bottom" />
        </div>
      );
    }
  }
}

export default Login;
