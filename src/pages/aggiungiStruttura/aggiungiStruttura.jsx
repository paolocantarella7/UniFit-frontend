import React, {useState} from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import MultipleDatePicker from "../../components/datePicker/datePicker";

class AggiungiStruttura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome:"gg flutter",
      prezzoPerFascia:"34",
      durataFascia:"1:00",
      dataInizio:"25/12/2012",
      capacitaPerFascia:"4",
      oraIM:"10:00",
      oraFM:"13:00",
      oraIP:"16:00",
      oraFP:"20:00",
      dateChiusura:[],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}); 
  }

  handleSubmit(event) {
    alert('E stato inserito un nome: ' + this.state.nome);
    event.preventDefault();
  }

    render() {
        return (
          <div>
            <ConnectedHeader
              {...this.props}
              currentUser={new User("admin", "Luigi")}
              type= "admin"
            />
            
            
            <form className="container-fluid text-dark rounded col-10 col-sm-10 col-lg-7 col-xl-6 text-center bg-white my-4 py-4">
              <h1 className="pt-4">Aggiungi Struttura</h1>

          <div className="form-group py-2 col-md-8  mx-auto">
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Nome..."
              value={this.state.nome}
              onChange={this.handleChange}
            />
          </div>

          <div className="row col-md-8 mx-auto">
            <div className="form-group py-2 col">
            <h4>Prezzo per fascia</h4>
                <input
                type="number"
                className="form-control"
                id="prezzoPerFascia"
                aria-describedby="emailHelp"
                placeholder="Valore"
                value={this.state.prezzoPerFascia}
                onChange={this.handleChange}
                />
            </div>
            
            <div className="form-group py-2 col">
            <h4>Durata Fascia</h4>
                <input
                type="time"
                className="form-control"
                id="prezzoPerDurata"
                aria-describedby="emailHelp"
                placeholder="Durata fascia..."
                value={this.state.prezzoPerFascia}
                onChange={this.handleChange}
                />
            </div>
          </div>

            <h4>Data di inizio</h4>
          <div className="form-group py-2 col-md-8  mx-auto">
            <input
              type="date"
              className="form-control"
              id="dataInizio"
              aria-describedby="emailHelp"
              placeholder="Data di inizio..."
              value={this.state.dataInizio}
              onChange={this.handleChange}
            />
          </div>
          
          <div className="form-group py-2 col-md-8  mx-auto">
          <h4>Capacita per fascia</h4>
                <input
                type="number"
                className="form-control"
                id="capacitaPerFascia"
                aria-describedby="emailHelp"
                placeholder="Valore..."
                value={this.state.capacitaPerFascia}
                onChange={this.handleChange}
                />
            </div>

            <h4>Orario mattina</h4>
            <div className="row col-md-8  mx-auto">
            
            <div className="form-group py-2 col">
            <h5>Dalle</h5>
                <input
                type="time"
                className="form-control"
                id="orarioMattinaStart"
                aria-describedby="emailHelp"
                value={this.state.oraIM}
                onChange={this.handleChange}
                />
            </div>
            
            <div className="form-group py-2 col">
            <h5>Alle</h5>
                <input
                type="time"
                className="form-control"
                id="orarioMattinaFinish"
                aria-describedby="emailHelp"
                value={this.state.oraFM}
                onChange={this.handleChange}
                />
            </div>
          </div>

          <h4>Orario pomeridiano</h4>
            <div className="row col-md-8  mx-auto">
            
            <div className="form-group py-2 col">
            <h5>Dalle</h5>
                <input
                type="time"
                className="form-control"
                id="orarioPomeridianoStart"
                aria-describedby="emailHelp"
                value={this.state.oraIP}
                onChange={this.handleChange}
                />
            </div>
            
            <div className="form-group py-2 col">
            <h5>Alle</h5>
                <input
                type="time"
                className="form-control"
                id="orarioPomeridianoFinish"
                aria-describedby="emailHelp"
                value={this.state.oraFP}
                onChange={this.handleChange}
                />
            </div>

            
          </div>

          <div className="form-group py-2">
            <button
              type="button"
              className="btn btn-secondary  border col-6 rounded"
              data-toggle="modal"
            data-target="#modalDatePicker"
            >
              Inserisci i giorni di chiusura
            </button>
            </div>
            
          

          <button
            type="button"
            className="btn btn-primary bg-cyan border col-6 rounded"
           onClick={this.handleSubmit}>
            Aggiungi
          </button>

          
        </form>


            <Footer {...this.props} />

            <div className="modal" id="modalDatePicker" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body mx-auto">
                    <MultipleDatePicker/>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onChange} >Salva</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        );
      }
}

export default AggiungiStruttura;