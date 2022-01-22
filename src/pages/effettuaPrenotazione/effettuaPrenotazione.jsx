import React  from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import Server from "../../config.json";
import { DropdownButton, Dropdown, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

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
      selectedStructureName: "",
      errors: {},
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
      errors.selectedStructureId = "Inserisci una struttura";
    if (this.state.selectedFascia === "")
      errors.selectedFascia = "Inserisci una fascia";
    if (this.state.date === "") errors.data = "Inserisci una data";
    if (errors.data || errors.selectedFascia || errors.selectedStructureId) {
      this.setState({ errors });
      return;
    }
    
    this.props.history.push({
      pathname: "/makePayment",
      state: {
        selectedStructureId: this.state.selectedStructureId,
        selectedFascia: this.state.selectedFascia,
        date: this.state.date,
        prenotazione: true,
      },
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onStructureSelect = (e) => {
    this.state.selectedStructureId = e;
    this.state.selectedFascia = "";
    this.strutturaGetNome();
    this.setState({});
    this.fasceGet();
  };

  onFasciaSelect = (e) => {
    this.state.selectedFascia = e;
    this.setState({});
  };

  strutturaGetNome() {
    this.setState({ loading: true })

    this.state.structures.map(strutturaSelected => {
      if (strutturaSelected.idStruttura === Number(this.state.selectedStructureId)) {
        this.setState({ selectedStructureName: strutturaSelected.nome },
          () => this.setState({ loading: false }))
      }
    })
  }

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
          <div>
            <ConnectedHeader {...this.props} />
            <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4 py-2">
              <h3 className="py-4 text-cyan">Effettua prenotazione</h3>
              <Form>
                <div className="row my-4 mx-4">
                  <div className="col-6">
                    <Card>
                      <Card.Body>
                        <Card.Text>{this.state.selectedStructureName}</Card.Text>
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

                {this.state.selectedStructureId === "" ? (
                  ""
                ) : (
                  <>
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
                      <p className="errmsg">{this.state.errors.data}</p>
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
}
export default EffettuaPrenotazione;
