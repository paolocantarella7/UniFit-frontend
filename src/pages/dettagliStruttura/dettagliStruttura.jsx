import React from 'react';
import Footer from '../../components/footer/footer'
import ConnectedHeader from '../../components/header/header'
import { User } from "../../models/User";

class DettagliStruttura extends React.Component {

  state = {
    structure:{},
    loading: true
  }

  componentDidMount() {
    this.strutturaGet()
  }
  
  strutturaGet() {
    var url = `admin/strutture/dettagliStruttura/${this.props.match.params.id}`
    console.log(url)
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
                  <p className="mx-auto text-black">10/10/2021</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Orario Mattina</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">10:00</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Orario Pomeriggio</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">17:00</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Durata Fascia</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">2 ore</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Prezzo per fascia</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">6 euro</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Capacita per fascia</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">20</p>
                </div>
               
              </div>
            </div>
          <Footer />
      </div>
    )
  }
}

export default DettagliStruttura;