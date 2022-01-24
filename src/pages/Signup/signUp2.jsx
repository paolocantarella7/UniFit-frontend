import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import "./signupdoctor.scss";
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import Server from "../../config.json";

class SignUp2 extends React.Component {
  constructor(props) {
    super();
    this.state = {
      codiceFiscale: "",
      indirizzo: "",
      telefono: "",
      dataDiNascita: "",
      nazionalita: "",
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
      case "codiceFiscale":
        errors.codiceFiscale =
          value.length < 16 ? "Codice fiscle non valido" : "";
        break;
      case "indirizzo":
        errors.indirizzo = value.length < 3 ? "Indirizzo non valido" : "";
        break;
      case "telefono":
        errors.telefono = value.length < 8 ? "Telefono non valido" : "";
        break;
      case "nazionalita":
        errors.nazionalita = value.length < 3 ? "Nazionalità non valida" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  formSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (this.state.codiceFiscale.length < 16)
      errors.codiceFiscale = "Codice Fiscale non valido";
    if (this.state.indirizzo.length < 3)
      errors.indirizzo = "Indirizzo non valido";
    if (this.state.telefono.length !== 10)
      errors.telefono = "Numero di telefono non valido";

    //controllo data e nazionalita

    if (
      errors.codiceFiscale ||
      errors.indirizzo ||
      errors.telefono ||
      errors.dataDiNascita ||
      errors.nazionalita
    ) {
      this.setState({ errors });
      return;
    } else {
      this.setState({ loading: true });

      console.log(this.props.location.state);

      var data = new FormData();
      data.append("email", this.props.location.state.email);
      data.append("password", this.props.location.state.pass);
      data.append("nome", this.props.location.state.name);
      data.append("cognome", this.props.location.state.surname);

      data.append("codiceFiscale", this.state.codiceFiscale);
      data.append("indirizzoResidenza", this.state.indirizzo);
      data.append("numeroTelefono", this.state.telefono);
      data.append("dataNascita", this.state.dataDiNascita);
      data.append("nazionalita", this.state.nazionalita);

      var url = Server.API_URL + "user/registrati";

      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.code === 201) {
            toast.success(responseJson.msg, {
              autoClose: 8000,
              className: "success",
            });

            localStorage.removeItem("currentUser");
            localStorage.setItem("isLogged", false);
            window.location.assign(Server.FRONT_URL + "registerDone");
          } else {
            if (responseJson.code === 400) {
              responseJson.error.map((error) => {
                toast.error(error.msg, {
                  autoClose: 8000,
                  className: "errorToast",
                });
                return null;
              });
            }
          }

          this.setState({ loading: false });
        });
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
                <h1 className="heading">Dicci qualcosa in più su di te</h1>
              </div>

              <div className="right_bottom">
                <form method="post" onSubmit={this.formSubmit}>
                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-address-card" aria-hidden="true"></i>
                    </div>
                    <input
                      required
                      type="text"
                      name="codiceFiscale"
                      placeholder="Codice fiscale"
                      className="effect-8"
                      onBlur={this.validate}
                      value={this.state.codiceFiscale}
                      onChange={this.handleChange}
                    />

                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.codiceFiscale ? (
                      <p className="errmsg">
                        {this.state.errors.codiceFiscale}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="change">
                    <div className="input_icons">
                      <i
                        className="fa fa-location-arrow"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <input
                      required
                      type="text"
                      name="indirizzo"
                      placeholder="Indirizzo"
                      className="effect-8"
                      maxLength="40"
                      value={this.state.indirizzo}
                      onChange={this.handleChange}
                      onBlur={this.validate}
                    ></input>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.indirizzo ? (
                      <p className="errmsg">{this.state.errors.indirizzo}</p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <input
                      type="text"
                      name="telefono"
                      placeholder="Telefono"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.telefono}
                      onChange={this.handleChange}
                      onBlur={this.validate}
                    ></input>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.telefono ? (
                      <p className="errmsg">{this.state.errors.telefono}</p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                    </div>
                    <input
                      type="date"
                      name="dataDiNascita"
                      placeholder="Data di nascita"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.dataDiNascita}
                      onChange={this.handleChange}
                      onBlur={this.validate}
                    ></input>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.dataDiNascita ? (
                      <p className="errmsg">
                        {this.state.errors.dataDiNascita}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="change">
                    <div className="input_icons">
                      <i className="fa fa-flag" aria-hidden="true"></i>
                    </div>
                    <input
                      type="text"
                      name="nazionalita"
                      placeholder="Nazionalità"
                      className="effect-8"
                      maxLength="15"
                      value={this.state.nazionalita}
                      onChange={this.handleChange}
                      onBlur={this.validate}
                    ></input>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="error_div">
                    {this.state.errors.nazionalita ? (
                      <p className="errmsg">{this.state.errors.nazionalita}</p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="row py-3 px-3">
                    <button className="btn bg-white text-cyan border col-12 rounded">
                      Registrati
                    </button>
                  </div>
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
          </div>
          {this.state.loading ? <Loading /> : ""}
          <Footer />
        </div>
      );
    }
  }
}

export default SignUp2;
