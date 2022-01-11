import React, {useState} from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import MultipleDatePicker from "../../components/datePicker/datePicker";


class AggiungiStruttura extends React.Component {

  

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

          <div class="form-group py-2 col-md-8  mx-auto">
            <input
              type="text"
              class="form-control"
              id="nome"
              aria-describedby="emailHelp"
              placeholder="Nome..."
            />
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
                />
            </div>
            
            <div class="form-group py-2 col">
            <h4>Durata Fascia</h4>
                <input
                type="time"
                class="form-control"
                id="prezzoPerDurata"
                aria-describedby="emailHelp"
                placeholder="Durata fascia..."
                />
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
            />
          </div>
          
          <div class="form-group py-2 col-md-8  mx-auto">
          <h4>Capacita per fascia</h4>
                <input
                type="number"
                class="form-control"
                id="capacitaPerFascia"
                aria-describedby="emailHelp"
                placeholder="Valore..."
                />
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
                />
            </div>
            
            <div class="form-group py-2 col">
            <h5>Alle</h5>
                <input
                type="time"
                class="form-control"
                id="orarioMattinaFinish"
                aria-describedby="emailHelp"
                />
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
                />
            </div>
            
            <div class="form-group py-2 col">
            <h5>Alle</h5>
                <input
                type="time"
                class="form-control"
                id="orarioPomeridianoFinish"
                aria-describedby="emailHelp"
                />
            </div>

            
          </div>

          <div class="form-group py-2">
            <button
              type="button"
              class="btn btn-secondary  border col-6 rounded"
              data-toggle="modal"
            data-target="#modalDatePicker"
            >
              Inserisci i giorni di chiusura
            </button>
            </div>
            
          

          <button
            type="button"
            class="btn btn-primary bg-cyan border col-6 rounded"
          >
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
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.onDelete(this.props.struttura.id)}>Salva</button>
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