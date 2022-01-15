import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import MultipleDatePicker from "../../components/datePicker/datePicker";
import FormStruttura from "../../components/formStruttura/formStruttura";
import Server from "../../config.json";



class AggiungiStruttura extends React.Component {
  state = {
    form: [],
    errors: [],
  };

  salvaStruttura(form) {
    console.log(form)

      var data = new FormData()
     
      data.append('nome', form.nome )
      data.append('prezzoPerFascia', form.prezzoPerFascia )
      data.append('dataInizioDisponibilita', form.dataInizio )
      data.append('capacitaPerFascia', form.capacitaPerFascia )
      data.append('oraInizioMattina', form.oraIM )
      data.append('oraFineMattina', form.oraFM )
      data.append('oraInizioPomeriggio', form.oraIP )
      data.append('oraFinePomeriggio', form.oraFP )
      data.append('durataPerFascia', form.durataFascia )
      data.append('dateChiusura', JSON.stringify({dateChiusura: [] }) )
      
      var url = Server.API_URL + "admin/strutture/aggiungistruttura"
      fetch(url, {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
        .then(responseJson =>
          //qui vado a gestire il JSON che mi restituisce il Server
          console.log('DATA', responseJson.error),
           
        )
        .catch(error => console.log(error))

  }

  render() {
    return (
      <div>
        <ConnectedHeader
          {...this.props}
          currentUser={new User("admin", "Luigi")}
          type="admin"
        />


        <div className="container-fluid text-dark rounded col-10 col-sm-10 col-lg-7 col-xl-6 text-center bg-white my-4 py-4">
          <h1 className="pt-4">Aggiungi Struttura</h1>

          <FormStruttura
            onSubmit={(form) => this.salvaStruttura(form)}
          />

        </div>



        <Footer {...this.props} />

        {/*
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
            </div>*/}
      </div>
    );

  }
}

export default AggiungiStruttura;