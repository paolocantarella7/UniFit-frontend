import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import validEmailRegex from "../../emailRegx";
import "./signupdoctor.scss";
import Loading from "../../components/loading/loading";
import Form from 'react-bootstrap'

class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      pass: "",
      name: "",
      surname: "",
      errors: {},
      loading: false,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  validate = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email non valida";
        break;
      case "pass":
        errors.pass =
          value.length < 8
            ? "La password deve essere almeno di 8 caratteri"
            : "";
        break;
      case "name":
        errors.name =
          value.length <= 0
            ? "Inserire il nome"
            : "";
        break;
      case "surname":
        errors.surname =
          value.length <= 0
            ? "Inserire il cognome"
            : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  formSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (this.state.name.length <= 0)
      errors.pass = "Inserire il nome";
    if (this.state.surname.length <= 0)
      errors.pass = "Inserire il cognome";
    if (!validEmailRegex.test(this.state.email))
      errors.email = "Email non valida";
    if (this.state.pass.length < 8)
      errors.pass = "La password deve essere almeno di 8 caratteri";

    if (errors.email || errors.pass || errors.name || errors.surname) {
      this.setState({ errors });
      console.log(this.state.errors)
      return;
    } else {
      this.props.history.push({
        pathname: '/secondRegister',
        state: { email: this.state.email, pass: this.state.pass, name: this.state.name, surname: this.state.surname }
      })

    }
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
        <div className="page">
          <ConnectedHeader {...this.props} />
          <div className="signup_main">
            <div className="signup_right mx-auto">
              <div className="right_top">
                <h1 className="heading">Registrati</h1>
              </div>
              <div className="right_bottom">
                <form onSubmit={this.formSubmit}>
                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Nome"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.name}
                      onChange={this.handleChange}
                      onBlur={this.validate}
                    ></input>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.name ? (
                      <p className="errmsg">{this.state.errors.name}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <input
                      required
                      type="text"
                      name="surname"
                      placeholder="Cognome"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.surname}
                      onChange={this.handleChange}
                      onBlur={this.validate}
                    ></input>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.surname ? (
                      <p className="errmsg">{this.state.errors.surname}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </div>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="effect-8"
                      onBlur={this.validate}
                      required
                      value={this.state.email}
                      onChange={this.handleChange}
                    />

                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.email ? (
                      <p className="errmsg">{this.state.errors.email}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </div>
                    <input
                      required
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

                  {/* inserire check box per informativa privacy
                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </div>
                    <div className="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Conforme alla direttiva della privacy 00/2004
                      </label>
                    </div>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>*/}

                  <div className="error_div">
                    {this.state.errors.pass ? (
                      <p className="errmsg">{this.state.errors.pass}</p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="row py-3 px-3">
                    <button className="btn bg-white text-cyan border col-12 rounded">Avanti</button>
                  </div>

                </form>

                <div className="final_error">
                  {this.state.errors.invalid ? (
                    <p className="errmsg">{this.state.errors.invalid}</p>
                  ) : (
                    ''
                  )}
                </div>

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

export default SignUp;
