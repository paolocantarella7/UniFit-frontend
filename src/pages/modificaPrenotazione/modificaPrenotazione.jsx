import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import Server from "../../config.json";
import { DropdownButton, Dropdown, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

class ModificaPrenotazione extends React.Component {
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
      selectedStructureName: "",
      errors: {},
      prenotazione: {},
    };
  }

  componentDidMount() {
    this.struttureGet();
    this.datiStrutturaGet();
  }

  datiStrutturaGet() {
    var url =
      Server.API_URL +
      `prenotazione/dettagliPrenotazione?idPrenotazione=${this.props.match.params.id}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState(
          {
            selectedStructureId: responseJson.dettagli.struttura,
            prenotazione: responseJson.dettagli,
            date: responseJson.dettagli.dataPrenotazione,
            selectedFascia: `${responseJson.dettagli.oraInizio.substring(
              0,
              responseJson.dettagli.oraInizio.lastIndexOf(":")
            )}-${responseJson.dettagli.oraFine.substring(
              0,
              responseJson.dettagli.oraFine.lastIndexOf(":")
            )}`,
          },
          () => {
            this.setState({ loading: false });
            this.fasceGet();
            this.getNomeStruttura();
          }
        );
      })
      .catch((error) => console.log(error));
  }

  getNomeStruttura() {
    var url =
      Server.API_URL +
      `admin/strutture/dettagliStruttura/${this.state.prenotazione.struttura}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            selectedStructureName: responseJson.struttura.nome,
          },
          () => {
            this.setState({ loading: false });
          }
        );
      })
      .catch((error) => console.log(error));
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

  strutturaGetNome() {
    var url =
      Server.API_URL +
      `admin/strutture/dettagliStruttura/${this.state.selectedStructureId}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          { selectedStructureName: responseJson.struttura.nome },
          () => {
            this.setState({ loading: false });
          }
        );
      })
      .catch((error) => console.log(error));
  }

  edit = () => {
    let errors = {};
    if (this.state.selectedStructureId === "")
      errors.selectedStructureId = "Inserisci una struttura";
    if (this.state.selectedFascia === "")
      errors.selectedFascia = "Inserisci una fascia";
    if (this.state.date === "") errors.data = "Inserisci una data";
    if (errors.data || errors.selectedFascia || errors.selectedStructureId) {
      this.setState({ errors });
      return;
    }
    var url = Server.API_URL + `prenotazione/modificaPrenotazione`;
    var data = new FormData();
    data.append("idStruttura", this.state.selectedStructureId);
    data.append("dataPrenotazione", this.state.date);
    data.append("fascia", this.state.selectedFascia);
    data.append("idPrenotazione", this.props.match.params.id);
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 200) {
          toast.success(responseJson.msg, {
            autoClose: 8000,
            className: "success",
          });
        } else if (responseJson.code === 400) {
          responseJson.error.map(error => {
            toast.error(error.msg, {
              autoClose: 8000,
              className: "error",
            });
          })
          return null;
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
      selectedFascia: "",
    });
    this.strutturaGetNome();
    this.setState({});
    this.fasceGet();
  };

  onFasciaSelect = (e) => {
    this.setState({
      selectedFascia: e,
    });
  };

  render() {
    if (localStorage.getItem("isLogged") === false) {
      return <Redirect to="/" />;
    } else {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin === 1) {
        return <Redirect to="/adminArea" />;
      } else {
        return (
          <div className="page">
            <ConnectedHeader {...this.props} />
            <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4 py-2">
              <h1 className="py-4 text-cyan">Modifica prenotazione</h1>
              <Form>
                <div className="row my-4 mx-4">
                  <div className="col-6 mx-auto h2 font-weight-bold">
                    {this.state.selectedStructureName}
                  </div>
                </div>
                <div className="row">
                  <div className="error_div mx-auto">
                    {this.state.errors.selectedStructureId ? (
                      <p className="errmsg">
                        {this.state.errors.selectedStructureId}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <>

                  <div className="row my-4 mx-4">
                    <div className="col-8 mx-auto">

                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Seleziona nuova fascia"
                        onSelect={this.onFasciaSelect}
                      >
                        {this.state.fasce.map((fascia) => (
                          <Dropdown.Item eventKey={fascia}>
                            {fascia}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </div>

                  </div>

                  <div className="row my-2 mx-4">
                    <div className="col-6 mx-auto">
                      <Card className="border-0 h2">
                        <Card.Body >
                          <Card.Text>{this.state.selectedFascia}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>




                  <div className="row">
                    <div className="error_div mx-auto">
                      {this.state.errors.selectedFascia ? (
                        <p className="errmsg">
                          {this.state.errors.selectedFascia}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>



                <div className="row">
                  <Button
                    variant="primary"
                    size="lg"
                    className="my-4 col-6 col-sm-4 mx-auto bg-cyan border"
                    onClick={this.edit}
                  >
                    Salva
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
}
export default ModificaPrenotazione;
