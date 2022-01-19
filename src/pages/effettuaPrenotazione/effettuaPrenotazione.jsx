import React, { useState } from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import Server from "../../config.json";
import { DropdownButton, Dropdown, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";

class EffettuaPrenotazione extends React.Component {
  constructor() {
    super();
    this.state = {
      structures: [],
      selectedFascia: "",
      fasce: [],
      date: "",
      slot: "",
      loading: true,
      selectedStructureId: "",
    };
  }

  componentDidMount() {
    this.struttureGet();
  }

  struttureGet() {
    var url = Server.API_URL + "admin/strutture/visualizzastrutture";
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ structures: responseJson.strutture }, () => {
          this.setState({ loading: false });
        });
      })
      .catch((error) => console.log(error));
  }

  fasceGet() {
    var url =
      Server.API_URL +
      `prenotazione/getFasce?idStruttura=${this.state.selectedStructureId}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ fasce: responseJson.listaFasce }, () => {
          this.setState({ loading: false });
        });
      })
      .catch((error) => console.log(error));
  }

  goToPayment = () => {
    let errors = {};
    if (this.state.selectedStructureId === "")
      errors.selectedStructureId = "Inserisci una data";
    if (this.state.selectedFascia === "")
      errors.selectedFascia = "Inserisci una fascia";
    if (errors.date || errors.slot) {
      this.setState({ errors });
      return;
    }
    this.props.history.push({
      pathname: "/makePayment",
      state: {
        type: this.state.type,
      },
    });
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  }

  render() {
    if (localStorage.getItem("isLogged") === "false") {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin) {
        return <Redirect to="/adminArea" />;
      } else {
        return <Redirect to="/home" />;
      }
    } else {
      return (
        <div>
          <ConnectedHeader {...this.props} />
          <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4 py-2">
            <h3 className="py-4 text-cyan">Effettua prenotazione</h3>
            <Form>
              <div className="row my-4 mx-4">
                <div className="col-6">
                  <Card>
                    <Card.Body>
                      <Card.Text>{this.state.selectedStructureId}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-6">
                  {this.state.structures.size === 0 ? (
                    ""
                  ) : (
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Seleziona struttura"
                      onSelect={this.handleChange}
                    >
                      {this.state.structures.map((struttura) => (
                        <Dropdown.Item eventKey={struttura.idStruttura}>
                          {struttura.nome}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  )}
                </div>
              </div>

              {this.state.selectedStructureId === "" ? (
                ""
              ) : (
                <div className="row my-4 mx-4">
                  <div className="col-6">
                    <Card>
                      <Card.Body>
                        <Card.Text>{this.state.selectedFascia}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-6">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Seleziona fascia"
                      onSelect={this.handleChange}
                    >
                      {this.state.fasce.map((fascia) => (
                        <Dropdown.Item eventKey={fascia}>
                          {fascia}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col">
                  <Card>
                    <Card.Body>
                      <Card.Text>{this.state.date}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col">
                  <input type="date" name="date" onChange={this.handleChange}/>
                </div>
              </div>

              <div className="row">
                <Button
                  variant="primary"
                  size="lg"
                  className="my-3 col-8 mx-auto"
                  onClick={this.goToPayment}
                >
                  Paga ora
                </Button>
              </div>
            </Form>
          </div>
          <Footer {...this.props} />
        </div>
      );
    }
  }
}

export default EffettuaPrenotazione;
