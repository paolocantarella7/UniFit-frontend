import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Footer from "../../components/footer/footer";
import ConnectedHeader from "../../components/header/header";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Server from "../../config.json";
import { Redirect } from "react-router-dom";

export default class Pagamento extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
    expiryOnCard: "",
    errors: {},
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {

    const { name, value } = e.target;

    this.setState({ [name]: value }, () => {
      if (name === 'expiry') {
        this.setState({
          expiryOnCard: `${this.state.expiry.substring(this.state.expiry.indexOf("-") + 1, this.state.expiry.length)}${this.state.expiry.substring(2, 4)}`
        })
      }
    });


  };

  formSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (this.state.cvc.length != 3) errors.cvc = "CVC non valido valido";
    if (this.state.cvc.length === 0) errors.cvc = "Inserire CVC";
    if (this.state.expiry.length === 0)
      errors.expiry = "Inserire una scadenza valida";
    if (this.state.name.length <= 0) errors.name = "Inserire l'intestatario";
    if (this.state.number.length != 16)
      errors.number = "Numero della carta non valido";

    if (errors.cvc || errors.expiry || errors.name || errors.number) {
      this.setState({ errors });
      return;
    } else if (this.props.location.state.prenotazione === false) {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      var data = new FormData();
      data.append("file", this.props.location.state.selectedFile);
      data.append("tipologiaTesseramento", this.props.location.state.type);
      data.append("idUtente", user.idUtente);
      data.append("numeroCarta", this.state.number);
      data.append("intestatarioCarta", this.state.name);
      data.append("scadenzaCarta", this.state.expiry);
      data.append("cvvCarta", this.state.cvc);
      var url = Server.API_URL + "user/effettuaTesseramento";
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.code === 200 || responseJson.code === 201) {
            toast.success(responseJson.msg, {
              autoClose: 8000,
              className: "success",
            });

            window.location.assign(Server.FRONT_URL + "paymentDone");

          } else {
            if (responseJson.code === 400 && responseJson.error) {
              responseJson.error.map((error) => {
                toast.error(error.msg, {
                  autoClose: 8000,
                  className: "errorToast",
                });
              });
            } else {
              toast.error(responseJson.msg, {
                autoClose: 8000,
                className: "error",
              });
            }
          }

          this.setState({ loading: false });
        });
    } else {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      var data = new FormData();
      data.append("idUtente", user.idUtente);
      data.append("numeroCarta", this.state.number);
      data.append("intestatarioCarta", this.state.name);
      data.append("scadenzaCarta", this.state.expiry);
      data.append("cvvCarta", this.state.cvc);
      data.append("idStruttura", this.props.location.state.selectedStructureId);
      data.append("fascia", this.props.location.state.selectedFascia);
      data.append("dataPrenotazione", this.props.location.state.date);
      var url = Server.API_URL + "prenotazione/effettuaPrenotazione";
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

            window.location.assign(Server.FRONT_URL + "paymentDone");

          } else {
            if (responseJson.code === 400) {
    
                toast.error(responseJson.msg, {
                  autoClose: 8000,
                  className: "errorToast",
                });
             
            }
          }

          this.setState({ loading: false });
        });
    }
  };

  validate = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "number":
        errors.number = value.length != 16 ? "Numero carta non valido" : "";
        break;
      case "name":
        errors.name = value.length <= 0 ? "Inserire il nome" : "";
        break;
      case "cvc":
        errors.cvc = value.length != 3 ? "Inserire un cvc valido" : "";
        break;
      case "expiry":
        errors.expiry = value.length === 0 ? "Inserire una scadenza valida" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  render() {
    if (localStorage.getItem("isLogged") === 'false') {

      return <Redirect to="/" />;
    }
    else {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin === 1) {
        return <Redirect to="/adminArea" />;
      } else {
        return (
          <div className="pb-4">
            <ConnectedHeader {...this.props} />
            <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4 px-4 py-4">
              <h3 className="py-4 text-cyan text-center">Pagamento</h3>
              <div id="PaymentForm" className="row">
                <div className="col my-4">
                  <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiryOnCard}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                  />
                </div>
                <div className="col-7 mx-auto">
                  <form className="mb-4 ">
                    <input
                      type="tel"
                      name="number"
                      onBlur={this.validate}
                      className="form-control mb-2 "
                      placeholder="Numero della carta"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                    <div className="error_div">
                      {this.state.errors.number ? (
                        <p className="errmsg">{this.state.errors.number}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <input
                      type="text"
                      name="name"
                      onBlur={this.validate}
                      className="form-control my-2"
                      placeholder="Intestatario"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                    <div className="error_div">
                      {this.state.errors.name ? (
                        <p className="errmsg">{this.state.errors.name}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <div>
                        <input
                          type="month"
                          name="expiry"
                          onChange={this.handleInputChange}
                        />
                        <div className="error_div">
                          {this.state.errors.expiry ? (
                            <p className="errmsg">{this.state.errors.expiry}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-8 mx-auto">
                        <input
                          type="number"
                          name="cvc"
                          onBlur={this.validate}
                          className="form-control my-2"
                          placeholder="CVC"
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                        />
                        <div className="error_div">
                          {this.state.errors.cvc ? (
                            <p className="errmsg">{this.state.errors.cvc}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {this.props.location.state.prenotazione === false ? (
                <div className="row ">
                  <Button
                    onClick={this.formSubmit}
                    variant="primary"
                    size="lg"
                    className="my-3 mx-4 mx-auto"
                  >
                    Paga ora{" "}
                    {this.props.location.state.type === "Interno"
                      ? "12€"
                      : "25€"}
                  </Button>
                </div>
              ) : (
                <div className="row ">
                  <Button
                    onClick={this.formSubmit}
                    variant="primary"
                    size="lg"
                    className="my-3 mx-4 mx-auto"
                  >
                    Paga ora 2€
                  </Button>
                </div>
              )}
            </div>
            <Footer />
          </div>
        );
      }
    }
  }
}