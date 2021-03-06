import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import Server from "../../config.json";
import { DropdownButton, Dropdown, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import NuovaPrenotazioneSvg from "../../nuovaPrenotazione.svg";

class EffettuaPrenotazione extends React.Component {
  constructor() {
    super();
    this.state = {
      structures: [],
      selectedFascia: "",
      fasce: [],
      date: "",
      loading: true,
      selectedStructureId: "",
      selectedStructureName: "",
      errors: {},
      prezzoPerFascia: ""
    };
  }

  componentDidMount() {
    this.struttureGet();
  }

  struttureGet() {
    this.setState({ loading: true })
    var url = Server.API_URL + "prenotazione/struttureDisponibili";

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.code === 200) {
          this.setState({ structures: responseJson.strutture }, () => {
            this.setState({ loading: false });
          });
        } else {
          toast.error("Connessione al server non riuscita", {
            autoClose: 5000,
            className: 'errorToast',
          })
          this.setState({ loading: false });
        }
      })
      .catch((error) => console.log(error));
  }

  fasceGet() {
    this.setState({ loading: true })
    var url = Server.API_URL + `prenotazione/getFasce?idStruttura=${this.state.selectedStructureId}`;

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
      errors.selectedStructureId = "Seleziona una struttura";
    if (this.state.selectedFascia === "")
      errors.selectedFascia = "Seleziona una fascia";
    if (this.state.date === "") errors.data = "Seleziona una data";
    if (errors.data || errors.selectedFascia || errors.selectedStructureId) {
      this.setState({ errors });
      return;
    }

    this.setState({ loading: true })

    let user = localStorage.getItem("currentUser");
    user = JSON.parse(user);

    var data = new FormData();

    data.append('idStruttura', this.state.selectedStructureId)
    data.append('fascia', this.state.selectedFascia)
    data.append('dataPrenotazione', this.state.date)
    data.append('idUtente', user.idUtente)

    var url = Server.API_URL + "prenotazione/checkPosti";

    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)

        if (responseJson.code === 200) {
          this.props.history.push({
            pathname: "/makePayment",
            state: {
              selectedStructureId: this.state.selectedStructureId,
              selectedFascia: this.state.selectedFascia,
              date: this.state.date,
              prezzoPerFascia: this.state.prezzoPerFascia,
              prenotazione: true,
            },
          });
        } else if (responseJson.code === 400) {
          responseJson.error.map(err => {
            toast.error(err.msg, {
              autoClose: 5000,
              className: 'errorToast',
            })
            return null;
          })
          this.setState({ loading: false });
        } else {
          toast.error("Connessione al server non riuscita!", {
            autoClose: 5000,
            className: 'errorToast',
          })
        }
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onStructureSelect = (e) => {
    this.setState({
      selectedStructureId: e,
      selectedFascia: ""
    }, () => {
      this.strutturaGetNome();
      this.fasceGet();
    });
  };

  onFasciaSelect = (e) => {
    this.setState({
      selectedFascia: e
    });
  };

  strutturaGetNome() {
    this.setState({ loading: true })

    this.state.structures.map(strutturaSelected => {
      if (strutturaSelected.idStruttura === Number(this.state.selectedStructureId)) {
        this.setState({ selectedStructureName: strutturaSelected.nome, prezzoPerFascia: strutturaSelected.prezzoPerFascia},
          () => this.setState({ loading: false }))
      }
      return null;
    })
  }

  render() {
    if (localStorage.getItem("isLogged") === "false") {
      return <Redirect to="/" />;
    }
    else {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin === 1) {
        return <Redirect to="/adminArea" />;
      } else {
        return (
          <div className="page">
            <ConnectedHeader {...this.props} />
            <div className="container-fluid text-dark rounded text-center col-10 bg-white my-4 py-2">
              <h1 className="py-4 text-cyan">Nuova prenotazione</h1>
              <Form>
                <div className="my-4 mx-4">
                  <div className="mx-auto">
                    {this.state.structures.size === 0 ? (
                      ""
                    ) : (
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Seleziona struttura"
                        onSelect={this.onStructureSelect}
                      >
                        {this.state.structures.map((struttura) => (
                          <Dropdown.Item eventKey={struttura.idStruttura}>
                            {struttura.nome}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    )}
                  </div>
                  <div className="col mx-auto">
                    <Card className="border border-0">
                      <Card.Body>
                        <Card.Text className="h2">{this.state.selectedStructureName}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>

                </div>
                <div className="row">
                  <div className="error_div mx-auto">
                    {this.state.errors.selectedStructureId ? (
                      <p className="errmsg text-danger font-weight-bold">
                        {this.state.errors.selectedStructureId}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {this.state.selectedStructureId === "" ? (
                  ""
                ) : (
                  <>
                    <div className="my-4 mx-4">
                      <div className="mx-auto">
                        <DropdownButton
                          id="dropdown-basic-button"
                          title="Seleziona fascia"
                          onSelect={this.onFasciaSelect}
                        >
                          {this.state.fasce.map((fascia) => (
                            <Dropdown.Item eventKey={fascia}>
                              {fascia}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </div>
                      <div className="mx-auto">
                        <Card className="border border-0">
                          <Card.Body>
                            <Card.Text className="h2">{this.state.selectedFascia}</Card.Text>
                          </Card.Body>
                        </Card>
                      </div>

                    </div>
                    <div className="row">
                      <div className="error_div mx-auto">
                        {this.state.errors.selectedFascia ? (
                          <p className="errmsg font-weight-bold text-danger">
                            {this.state.errors.selectedFascia}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </>
                )}

                <input
                  type="date"
                  name="date"
                  onChange={this.handleChange}
                  className="my-4"
                />
                <div className="row">
                  <div className="error_div mx-auto">
                    {this.state.errors.data ? (
                      <p className="errmsg text-danger font-weight-bold">{this.state.errors.data}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="row">
                  <Button
                    variant="primary"
                    size="lg"
                    className="my-3 col-8 mx-auto bg-cyan border"
                    onClick={this.goToPayment}
                  >
                    Procedi al pagamento
                  </Button>
                </div>
              </Form>

            </div>

            <img
              className="my-5 d-block mx-auto"
              alt="Pagamento effettuato"
              width="200"
              src={NuovaPrenotazioneSvg}
            />
            <Footer {...this.props} />
          </div>
        );
      }
    }
  }
}
export default EffettuaPrenotazione;