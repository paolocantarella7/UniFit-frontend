import React from 'react';
import ConnectedHeader from '../../components/header/header';
import Footer from '../../components/footer/footer'
import { Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/loading';
import Server from '../../config.json';
import RecuperoPasswordSvg from "../../recuperoPassword.svg";


// Login page
class Recover extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
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

    if (errors.username) {
      this.setState({ errors });
      return;
    } else {
      var data = new FormData();

      data.append("email", this.state.username);
    }
    this.setState({ loading: true });

    var url = Server.API_URL + "user/recupero-password";
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.code === 200) {
          toast.success(responseJson.msg, {
            autoClose: 8000,
            className: "success",
          });
        } else if (responseJson.code === 400) {
          responseJson.error.map((error) => {
            toast.error(error.msg, {
              autoClose: 8000,
              className: "error",
            });
            return null;
          });
        } else {
          toast.error(responseJson.msg, {
            autoClose: 8000,
            className: "error",
          });
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
        <div className="pb-4 page">
          <ConnectedHeader />
          <div className="signup_right mx-auto pb-5 my-5 rounded">
            <div className="right_top">
              <h1 className="heading">Recupero password</h1>
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
                    <p className="errmsg">{this.state.errors.username}</p>
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
          {
            this.state.loading ? <Loading /> : ''
          }
                    <img className="pt-3 pb-4 img-fluid mx-auto d-block" width={180} src={RecuperoPasswordSvg} alt="React Logo" />

          <Footer />
        </div>
      );
    }
  }
}

export default Recover;
