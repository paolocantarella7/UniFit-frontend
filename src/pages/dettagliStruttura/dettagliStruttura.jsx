import React from 'react';
import Footer from '../../components/footer/footer'
import ConnectedHeader from '../../components/header/header'
import { Link } from "react-router-dom";
import { User } from "../../models/User";
import Server from "../../config.json";
import { Redirect } from 'react-router-dom';
class DettagliStruttura extends React.Component {

  state = {
    structure:{},
    loading: true
  }

  componentDidMount() {
    this.strutturaGet()
  }
  
  strutturaGet() {
    var url = Server.API_URL+`admin/strutture/dettagliStruttura/${this.props.match.params.id}`
    
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
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
      <div>
          <ConnectedHeader
              {...this.props}
              currentUser={new User("admin", "Luigi")}
              type= "admin"/>

          <div className="w-75 bg-white mx-auto pb-5 my-5 rounded">
              <div className="row">
                <h1 className="mx-auto pt-4 text-cyan text-center px-4">Dettagli Struttura</h1>
              </div>
              <div className="container  my-4">
                <div className="row">
                  <h4 className="mx-auto text-cyan">Nome</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.nome}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Data inizio disponibilita</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.dataInizioDisponibilita}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Orario Mattina</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.oraInizioMattina}</p>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.oraFineMattina}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Orario Pomeriggio</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.oraInizioPomeriggio}</p>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.oraFinePomeriggio}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Durata Fascia</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.durataPerFascia}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Prezzo per fascia</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.prezzoPerFascia}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Capacita per fascia</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{this.state.structure.capacitaPerFascia}</p>
                </div>
               
              </div>

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