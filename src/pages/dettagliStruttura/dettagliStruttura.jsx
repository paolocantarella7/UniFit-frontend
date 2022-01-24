import React from 'react';
import Footer from '../../components/footer/footer'
import ConnectedHeader from '../../components/header/header'
import { Link } from "react-router-dom";
import Server from "../../config.json";
import { Redirect } from 'react-router-dom';
class DettagliStruttura extends React.Component {

  state = {
    structure: {},
    loading: true,
    giorniChiusura: []
  }

  componentDidMount() {
    this.strutturaGet()
  }

  strutturaGet() {
    var url = Server.API_URL + `admin/strutture/dettagliStruttura/${this.props.match.params.id}`

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {

        var tempDate = []

        responseJson.struttura.giorniChiusura.map(obj => {
          tempDate.push(obj.dataChiusura)
        })

        responseJson.struttura.giorniChiusura = tempDate

        this.setState({ giorniChiusura: tempDate })


        this.setState({ structure: responseJson.struttura }, () => {
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

      <div className="page">
        <ConnectedHeader {...this.props} />

        <div className="w-75 bg-white mx-auto pb-5 my-5 rounded">
          <div className="row">
            <h1 className="mx-auto my-4 text-cyan text-center px-4">Dettagli di {this.state.structure.nome}</h1>
          </div>

          <div className='container my-4'>

            <div className="row my-4">
              <div className="col-6 mx-auto text-center">
                <h4 className="text-cyan">Data inizio disponibilita</h4>
                <p className="text-dark h4">{this.state.structure.dataInizioDisponibilita}</p>
              </div>
              <div className="col-6 mx-auto text-center">
                <h4 className="text-cyan">Durata Per Fascia</h4>
                <p className="text-dark h4">{this.state.structure.durataPerFascia} ora/e</p>
              </div>
            </div>

            <div className="row">
              <div className="col-6 mx-auto  text-center">
                <h4 className="text-cyan">Capacita per fascia</h4>
                <p className="text-dark h4">{this.state.structure.capacitaPerFascia}</p>
              </div>
              <div className="col-6 mx-auto  text-center">
                <h4 className="text-cyan">Prezzo per fascia</h4>
                <p className="text-dark h4">{this.state.structure.prezzoPerFascia}</p>
              </div>
            </div>
          </div>
          <div className="row mx-auto mb-4">
            <div className="col-3 text-center mx-auto">
              <h4 className="text-cyan">Orario Mattina</h4>
              <p className="text-dark h4">{this.state.structure.oraInizioMattina}</p>
              <p className="text-dark h4">{this.state.structure.oraFineMattina}</p>
            </div>

            <div className="col-3 text-center mx-auto">
              <h4 className="text-cyan">Orario Pomeriggio</h4>
              <p className="mx-auto text-dark h4">{this.state.structure.oraInizioPomeriggio}</p>
              <p className="mx-auto text-dark h4">{this.state.structure.oraFinePomeriggio}</p>
            </div>
          </div>

          {this.state.giorniChiusura.length !== 0 &&
            <div className="row mx-auto mb-4">
              <div className="col-3 text-center mx-auto">
                <h4 className="text-cyan">Giorni di Chiusura</h4>

                {this.state.giorniChiusura.map((obj) => (
                  <p className="mx-auto text-dark h4">{obj}</p>
                ))}
              </div>
            </div>
          }

          <Link to={`/showReservation/${this.state.structure.idStruttura}`} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                className="btn btn-primary btn-lg mx-auto bg-cyan border col-10 col-sm-7 col-md-5">
                Lista Prenotazioni
              </button>
            </div>
          </Link>

        </div>
        <Footer />
      </div>
    )
  }
}

export default DettagliStruttura;