import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { DropdownButton, Dropdown } from "react-bootstrap";
// Login page
class EffettuaTesseramento extends React.Component {
  constructor() {
    super();
    this.state = {
      type: "",
      errors: {},
      loading: false,
      user: {},
      selectedFile: null,
    };
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleSelct = (e) => {
    this.state.type = e;
    this.setState({});
  };

  goToPayment = () => {
    let errors = {};
    if (this.state.selectedFile === null)
      errors.selectedFile = "Inserisci il certificato medico";
    if(this.state.type === "")
      errors.type = "Inserisci che tipo di utente sei"
    if (errors.type || errors.selectedFile) {
      this.setState({ errors });
      return;
    }
    this.props.history.push({
      pathname: "/makePayment",
      state: {
        type: this.state.type,
        selectedFile: this.state.selectedFile,
      },
    });
  };

  render() {
    let user = localStorage.getItem("currentUser");
    user = JSON.parse(user);
    if (localStorage.getItem("isLogged") === "false") {
      if (user.isAdmin) {
        return <Redirect to="/adminArea" />;
      } else {
        return <Redirect to="/home" />;
      }
    } else {
      return (
        <div>
          <ConnectedHeader {...this.props} />
          <div className="container-fluid text-dark rounded w-100 col-sm-10 col-10 bg-white my-4 px-4 py-4">
            <h3 className="py-4 text-cyan text-center">
              Effettua tesseramento
            </h3>

            <Card className="mx-4 my-4">
              <Card.Body>
                <Card.Title>Codice fiscale</Card.Title>
                <Card.Text>{user.codiceFiscale}</Card.Text>
              </Card.Body>
            </Card>

            <div className="row">
              <div className="col">
                <Card className="mx-4 my-4">
                  <Card.Body>
                    <Card.Title>Indirizzo</Card.Title>
                    <Card.Text>{user.indirizzoResidenza}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col">
                <Card className="mx-4 my-4">
                  <Card.Body>
                    <Card.Title>Telefono</Card.Title>
                    <Card.Text>{user.numeroTelefono}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Card className="mx-4 my-4">
                  <Card.Body>
                    <Card.Title>Data di nascita</Card.Title>
                    <Card.Text>{user.dataNascita}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col">
                <Card className="mx-4 my-4">
                  <Card.Body>
                    <Card.Title>Nazionalità</Card.Title>
                    <Card.Text>{user.nazionalita}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <Form className="text-center my-4">
              <DropdownButton
                id="dropdown-basic-button"
                title={
                  this.state.type === ""
                    ? "Che tipo di utente sei?"
                    : this.state.type
                }
                onSelect={this.handleSelct}
              >
                {["Interno", "Esterno"].map((tipo) => (
                  <Dropdown.Item eventKey={tipo}>{tipo}</Dropdown.Item>
                ))}
              </DropdownButton>
            </Form>
            <div className="error_div">
              {this.state.errors.type ? (
                <p className="errmsg">{this.state.errors.type}</p>
              ) : (
                ""
              )}
            </div>

            <div className="container">

                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroupFileAddon01"
                    >
                      Upload
                    </span>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      onChange = {this.onFileChange}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile01"
                    >
                      {this.state.selectedFile === null ? "Seleziona il certificato medico" : this.state.selectedFile.name}
                    </label>
                  </div>
                </div>
                <div className="error_div">
              {this.state.errors.selectedFile ? (
                <p className="errmsg">{this.state.errors.selectedFile}</p>
              ) : (
                ""
              )}
            </div>

              <div className="row">
                <Button
                  variant="primary"
                  size="lg"
                  className="my-3 col-8 mx-auto"
                  onClick={this.goToPayment}
                >
                  Inoltra richiesta di tesseramento
                </Button>
              </div>
            </div>
          </div>
          <Footer {...this.props} />
        </div>
      );
    }
  }
}

export default EffettuaTesseramento;
