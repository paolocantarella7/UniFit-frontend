import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Server from "../../config.json";
import { Redirect } from 'react-router-dom';
import DatePicker from "react-multi-date-picker";
import {toast} from 'react-toastify';
class ModificaStruttura extends React.Component {
  state = {
    nome: '',
    prezzoPerFascia: '',
    capacitaPerFascia: '',
    dataInizioDisponibilita: '',
    oraInizioMattina: '',
    oraFineMattina: '',
    oraInizioPomeriggio: '',
    oraFinePomeriggio: '',
    durataPerFascia: '',
    dateChiusura: [],
    idStruttura: '',

    loading: true,
    errors: []
  }

  componentDidMount() {
    this.strutturaGet()
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  validate = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'nome':
        errors.nome = value.length <= 0
          ? 'nome non valido'
          : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value })
  }

  strutturaGet() {
    var url = Server.API_URL + `admin/strutture/dettagliStruttura/${this.props.match.params.id}`
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
      
        this.setState({ nome: responseJson.struttura.nome })
        this.setState({ prezzoPerFascia: responseJson.struttura.prezzoPerFascia })
        this.setState({ capacitaPerFascia: responseJson.struttura.capacitaPerFascia })
        this.setState({ dataInizioDisponibilita: responseJson.struttura.dataInizioDisponibilita })
        this.setState({ oraInizioMattina: responseJson.struttura.oraInizioMattina })
        this.setState({ oraFineMattina: responseJson.struttura.oraFineMattina })
        this.setState({ oraInizioPomeriggio: responseJson.struttura.oraInizioPomeriggio })
        this.setState({ oraFinePomeriggio: responseJson.struttura.oraFinePomeriggio })
        this.setState({ dateChiusura: responseJson.struttura.giorniChiusura})
        this.setState({ idStruttura: responseJson.struttura.idStruttura })

        this.setState({ loading: false})
      })

      .catch(error => console.log(error))
  }

  formSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (this.state.nome.length <= 0)
      errors.nome = "Nome vuoto!"
    if (this.state.capacitaPerFascia <= 0)
      errors.capacitaPerFascia = "Capacità massima non valida!"
    if (this.state.prezzoPerFascia <= 0)
      errors.prezzoPerFascia = "Prezzo non valido!"
  
    //controllo data e nazionalita

    if (errors.nome || errors.capacitaPerFascia || errors.prezzoPerFascia ) {
      this.setState({ errors })
      return;
    } else {
      this.setState({ loading: true })

      var data = new FormData()
      
      data.append('nome', this.state.nome)
      data.append('prezzoPerFascia', this.state.prezzoPerFascia )
      data.append('dataInizioDisponibilita', this.state.dataInizioDisponibilita )
      data.append('capacitaPerFascia', this.state.capacitaPerFascia )
      data.append('oraInizioMattina', this.state.oraInizioMattina )
      data.append('oraFineMattina', this.state.oraFineMattina )
      data.append('oraInizioPomeriggio', this.state.oraInizioPomeriggio )
      data.append('oraFinePomeriggio', this.state.oraFinePomeriggio )
      data.append('durataPerFascia', this.state.durataPerFascia )
      data.append('dateChiusura', JSON.stringify({dateChiusura: [] }) )
      data.append('idStruttura', this.state.idStruttura)

      var url = Server.API_URL + "admin/strutture/modificastruttura"
    
      fetch(url, {
        method: 'POST',
        body: data
      }).then(response => response.json()
      ).then(responseJson => {
        console.log(responseJson)
        if (responseJson.code === 201) {
          toast.success(responseJson.msg, {
            autoClose: 8000,
            className: "success"
          })

          localStorage.removeItem("currentUser");
          localStorage.setItem("isLogged", false);
          window.location.assign(Server.FRONT_URL + "registerDone");

        } else {
          if (responseJson.code === 400) {
            responseJson.error.map(error => {
              toast.error(error.msg, {
                autoClose: 8000,
                className: "errorToast"
              })
            })
          }
        }

        this.setState({ loading: false })

      })
    }
  }


  render() {
    if (localStorage.getItem('isLogged') === 'true') {

      let user = localStorage.getItem('currentUser')
      user = JSON.parse(user);

      if (user.isAdmin !== 1) {
        return <Redirect to="/home" />
      }
    }
    return (
      <>
        <div>
          <ConnectedHeader {...this.props}/>

          <div className="container-fluid text-dark rounded col-10 col-sm-10 col-lg-7 col-xl-6 text-center bg-white my-4 py-4">
            <h1 className="pt-4">Modifica Struttura</h1>

            <form method="post" onSubmit={this.formSubmit}>
              <h6 className="pt-3">Nome struttura</h6>
              <div className="change">
                <input
                  required
                  type="text"
                  name="nome"
                  placeholder="Nome struttura"
                  className="effect-8"
                  onBlur={this.validate}
                  value={this.state.nome}
                  onChange={(e) => { this.setState({ nome: e.target.value }) }} />

                <span className="focus-border">
                  <i></i>
                </span>
              </div>
              <div className="error_div">
                {this.state.errors.nome
                  ? <p className="errmsg">{this.state.errors.nome}</p>
                  : ''
                }
              </div>

              <h6 className="pt-3">Prezzo per fascia</h6>
              <div className="change">
                <input
                  required
                  type="number"
                  name="prezzoPerFascia"
                  placeholder="Inserisci prezzo"
                  className="effect-8"
                  onBlur={this.validate}
                  value={this.state.prezzoPerFascia}
                  onChange={(e) => { this.setState({ prezzoPerFascia: e.target.prezzoPerFascia }) }} />

                <span className="focus-border">
                  <i></i>
                </span>
              </div>
              <div className="error_div">
                {this.state.errors.prezzoPerFascia
                  ? <p className="errmsg">{this.state.errors.prezzoPerFascia}</p>
                  : ''
                }
              </div>

              <h6 className="pt-3">Capacità per fascia</h6>
              <div className="change">
                <input
                  required
                  type="number"
                  name="capacitaPerFascia"
                  placeholder="Inserisci la capacità massima"
                  className="effect-8"
                  onBlur={this.validate}
                  value={this.state.capacitaPerFascia}
                  onChange={(e) => { this.setState({ capacitaPerFascia: e.target.value }) }} />

                <span className="focus-border">
                  <i></i>
                </span>
              </div>
              <div className="error_div">
                {this.state.errors.capacitaPerFascia
                  ? <p className="errmsg">{this.state.errors.capacitaPerFascia}</p>
                  : ''
                }
              </div>

              <h6 className="pt-3">data inizio disbonibilità</h6>
              <div className="change">
                <input
                  required
                  type="date"
                  name="dataInizioDisponibilita"
                  placeholder="Inserisci data"
                  className="effect-8"
                  onBlur={this.validate}
                  value={this.state.dataInizioDisponibilita}
                  onChange={(e) => { this.setState({ dataInizioDisponibilita: e.target.value }) }} />

                <span className="focus-border">
                  <i></i>
                </span>
              </div>
              <div className="error_div">
                {this.state.errors.dataInizioDisponibilita
                  ? <p className="errmsg">{this.state.errors.dataInizioDisponibilita}</p>
                  : ''
                }
              </div>

              <h6 className="pt-3">Ora mattina</h6>
              <div className="change">
                <input
                  required
                  type="time"
                  name="oraInizioMattina"
                  placeholder=""
                  className="effect-8"
                  onBlur={this.validate}
                  value={this.state.oraInizioMattina}
                  onChange={(e) => { this.setState({ oraInizioMattina: e.target.value }) }} />

                <span className="focus-border">
                  <i></i>
                </span>
              </div>
              <div className="error_div">
                {this.state.errors.oraInizioMattina
                  ? <p className="errmsg">{this.state.errors.oraInizioMattina}</p>
                  : ''
                }
              </div>

              <div className="change">
                <input
                  required
                  type="time"
                  name="oraFineMattina"
                  placeholder=""
                  className="effect-8"
                  onBlur={this.validate}
                  value={this.state.oraFineMattina}
                  onChange={(e) => { this.setState({ oraFineMattina: e.target.value }) }} />

                <span className="focus-border">
                  <i></i>
                </span>
              </div>
              <div className="error_div">
                {this.state.errors.oraFineMattina
                  ? <p className="errmsg">{this.state.errors.oraFineMattina}</p>
                  : ''
                }
              </div>

              <h6 className="pt-3">ORA POMERIGGIO</h6>
              <div className="change">
                <input
                  required
                  type="time"
                  name="oraInizioPomeriggio"
                  placeholder=""
                  className="effect-8"
                  onBlur={this.validate}
                  value={this.state.oraInizioPomeriggio}
                  onChange={(e) => { this.setState({ oraInizioPomeriggio: e.target.value }) }} />

                <span className="focus-border">
                  <i></i>
                </span>
              </div>
              <div className="error_div">
                {this.state.errors.oraInizioPomeriggio
                  ? <p className="errmsg">{this.state.errors.oraInizioPomeriggio}</p>
                  : ''
                }
              </div>

              <div className="change">
                <input
                  required
                  type="time"
                  name="oraFinePomeriggio"
                  placeholder=""
                  className="effect-8"
                  onBlur={this.validate}
                  value={this.state.oraFinePomeriggio}
                  onChange={(e) => { this.setState({ oraFinePomeriggio: e.target.value }) }} />

                <span className="focus-border">
                  <i></i>
                </span>
              </div>
              <div className="error_div">
                {this.state.errors.oraFinePomeriggio
                  ? <p className="errmsg">{this.state.errors.oraFinePomeriggio}</p>
                  : ''
                }
              </div>

              <button className="btn btn-outline-primary" data-toggle="modal" data-target="#modalDatePicker">Seleziona giorni di chiusura</button>

              <div>
                <button> Modifica </button>
              </div>

            </form>

          </div>

          <Footer {...this.props} />
        </div>



        <div className="modal" id="modalDatePicker" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <h5 className="modal-title my-2" id="exampleModalLabel">
                giorni di chiusura
              </h5>
              <div className="modal-body mx-auto">
                <DatePicker
                  multiple
                  value={this.state.dateChiusura}
                //onChange={this.setState({dateChiusura: values })}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" /*onClick={() => convertDates()}*/ >Salva</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  }
}

export default ModificaStruttura;