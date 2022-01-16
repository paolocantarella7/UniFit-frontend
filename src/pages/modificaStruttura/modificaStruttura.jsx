import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import Server from "../../config.json";
import { Redirect } from 'react-router-dom';
class ModificaStruttura extends React.Component {
  state = {
    structure:{},
    loading: true
  }

  componentDidMount() {
    this.strutturaGet()
  }
  
  strutturaGet() {
    var url = Server.API_URL+`admin/strutture/dettagliStruttura/${this.props.match.params.id}`
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
      if (localStorage.getItem('isLogged') === 'true') {
      
        let user = localStorage.getItem('currentUser')
        user = JSON.parse(user);
  
        if (!user.isAdmin) {
          return <Redirect to="/home" />
        }
      } 
        return (
          <>
            <div>
              <ConnectedHeader
                {...this.props}
                currentUser={new User("admin", "Luigi")}
                type= "admin"/>
              
              <form className="container-fluid text-dark rounded col-10 col-sm-10 col-lg-7 col-xl-6 text-center bg-white my-4 py-4">
                <h1 className="pt-4">Modifica Struttura</h1>

              <div class="form-group py-2 col-md-8  mx-auto">
              <input
                type="text"
                class="form-control"
                id="nome"
                aria-describedby="emailHelp"
                placeholder="Nome"
                value={this.state.structure.nome}/>
              </div>

              <div className="row col-md-8 mx-auto">
                <div class="form-group py-2 col">
                  <h4>Prezzo per fascia</h4>
                    <input
                    type="number"
                    class="form-control"
                    id="prezzoPerFascia"
                    aria-describedby="emailHelp"
                    placeholder="Valore"
                    value={this.state.structure.prezzoPerFascia}/>
                </div>
              
                <div class="form-group py-2 col">
                  <h4>Durata Fascia</h4>
                    <input
                    type="number"
                    class="form-control"
                    id="prezzoPerDurata"
                    aria-describedby="emailHelp"
                    placeholder="Durata fascia..."
                    value={this.state.structure.durataPerFascia}/>
                </div>
              </div>

              <h4>Data di inizio</h4>
              <div class="form-group py-2 col-md-8  mx-auto">
                <input
                  type="date"
                  class="form-control"
                  id="dataInizio"
                  aria-describedby="emailHelp"
                  placeholder="Data di inizio..."
                  value={this.state.structure.dataInizioDisponibilita}/>
              </div>
            
              <div class="form-group py-2 col-md-8  mx-auto">
                <h4>Capacita per fascia</h4>
                  <input
                  type="number"
                  class="form-control"
                  id="capacitaPerFascia"
                  aria-describedby="emailHelp"
                  placeholder="Valore..."
                  value={this.state.structure.capacitaPerFascia}/>
              </div>

              <h4>Orario mattina</h4>
                <div className="row col-md-8  mx-auto">
                  <div class="form-group py-2 col">
                    <h5>Dalle</h5>
                      <input
                      type="time"
                      class="form-control"
                      id="orarioMattinaStart"
                      aria-describedby="emailHelp"
                      value={this.state.structure.oraInizioMattina}/>
                  </div>
              
                  <div class="form-group py-2 col">
                    <h5>Alle</h5>
                      <input
                      type="time"
                      class="form-control"
                      id="orarioMattinaFinish"
                      aria-describedby="emailHelp"
                      value={this.state.structure.oraFineMattina}/>
                  </div>
                </div>

              <h4>Orario pomeridiano</h4>
                <div className="row col-md-8  mx-auto">
                  <div class="form-group py-2 col">
                    <h5>Dalle</h5>
                      <input
                      type="time"
                      class="form-control"
                      id="orarioPomeridianoStart"
                      aria-describedby="emailHelp"
                      value={this.state.structure.oraInizioPomeriggio}/>
                  </div>
              
                  <div class="form-group py-2 col">
                    <h5>Alle</h5>
                      <input
                      type="time"
                      class="form-control"
                      id="orarioPomeridianoFinish"
                      aria-describedby="emailHelp"
                      value={this.state.structure.oraFinePomeriggio}/>
                  </div>
                </div>

              <div class="form-group py-2">
                <button
                  type="button"
                  class="btn btn-secondary  border col-6 rounded">
                    Modifica i giorni di chiusura
                </button>
              </div>

                <button
                  type="button"
                  class="btn btn-primary bg-cyan border col-6 rounded"
                  data-toggle="modal"
                  data-target="#exampleModal">
                    Aggiungi
                </button>
              </form>

              <Footer {...this.props} />
            </div>
          </>
        );
      }
}

export default ModificaStruttura;