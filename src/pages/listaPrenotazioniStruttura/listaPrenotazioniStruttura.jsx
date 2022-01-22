import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import Server from "../../config.json";
import { Redirect } from 'react-router-dom';
import { Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import NessunaPrenotazioneSvg from "../../nessunaPrenotazione.svg";

class ListaPrenotazioniStruttura extends React.Component {
  state = {
    structure: [],
    reservation: [],
    loading: true,
    searchText: "",
  }
  componentDidMount() {
    this.utentiGet()
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  utentiGet() {
    var url = Server.API_URL + `admin/strutture/prenotazioniStruttura/${this.props.match.params.id}`
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ reservation: responseJson.struttura.listaPrenotazioniStruttura, structure: responseJson.struttura }, () => {
          this.setState({ loading: false })
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    if (localStorage.getItem('isLogged') === 'true') {

      let user = localStorage.getItem('currentUser')
      user = JSON.parse(user);

      if (!user.isAdmin) {
        return <Redirect to="/home" />
      }
    }
    return (
      this.state.loading ?

        <>
          <ConnectedHeader
            {...this.props}
            currentUser={new User("admin", "Luigi")}
            type="admin" />

          <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
            <h1 className="pt-4">Caricamento prenotazioni</h1>
          </div>

          <Footer {...this.props} />
        </>
        :
        <>
          <ConnectedHeader {...this.props} />
          <div className="container-fluid text-dark rounded col-xs-12 col-sm-8 text-center bg-white my-4">
            <h1 className="pt-4 text-cyan mb-4">{`Prenotazioni di ${this.state.structure.nome}`}</h1>

            <div className='col'>
              {(this.state.reservation.length == 0) ? (


                <div className="mb-4">
                  <img className="my-5" width="200" src={NessunaPrenotazioneSvg} />
                  <p className="pb-4">Non ci sono prenotazioni</p>
                </div>
              ) : (
                <div>



                  <div className=" mx-auto">
                    <input
                      type="text"
                      name="searchText"
                      placeholder="Cerca prenotazione..."
                      className="effect-8 rounded col-xs-12 col-sm-6"
                      style={{ border: '2px solid #00c1fc' }}
                      value={this.state.searchText}
                      onChange={this.handleChange} />
                  </div>


                  <Table striped borderless hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Dalle</th>
                        <th>Alle</th>
                      </tr>
                    </thead>
                    <tbody>



                      {this.state.reservation.filter(prenotazione => prenotazione.utentePrenotato.email.includes(this.state.searchText)).map(filteredPrenotazione => (
                        <tr>
                          <td>{filteredPrenotazione.idPrenotazione}</td>
                          <td>{filteredPrenotazione.utentePrenotato.email}</td>
                          <td>{filteredPrenotazione.oraInizio}</td>
                          <td>{filteredPrenotazione.oraFine}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )
              }
            </div>

          </div>
          <Footer {...this.props} />
        </>
    );
  }
}

export default ListaPrenotazioniStruttura;
