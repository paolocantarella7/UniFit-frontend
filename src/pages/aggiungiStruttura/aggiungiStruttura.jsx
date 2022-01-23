import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import FormStruttura from "../../components/formStruttura/formStruttura";
import Server from "../../config.json";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';


class AggiungiStruttura extends React.Component {
  state = {
    form: [],
    errors: [],
  };

  salvaStruttura(form) {
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
      
    if (form.giorniChiusura.length === 0) {
      data.append('dateChiusura', JSON.stringify({ dateChiusura: [] }))
    }
    else {
      data.append('dateChiusura', JSON.stringify({ dateChiusura: form.giorniChiusura }))
    }
      
      var url = Server.API_URL + "admin/strutture/aggiungistruttura"
      fetch(url, {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
        .then(responseJson => {

          if (responseJson.code === 400){
            responseJson.error.map( (item) => {
            toast.error(item.msg , {
              autoClose: 8000,
              className: "errorToast"
            })
          } )} else if (responseJson.code === 201){
            toast.success("Struttura aggiunta con successo" ,{
              autoClose: 5000,
              className: "success"
            })
          } 
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
        <ConnectedHeader {...this.props}/>


        <div className="container-fluid text-dark rounded col-10 col-sm-10 col-lg-7 col-xl-6 text-center bg-white my-4 py-4">
          <h1 className="pt-4 text-cyan mb-4">Aggiungi Struttura</h1>

          <FormStruttura
            onSubmit={(form) => this.salvaStruttura(form)}
          />

        </div>

        <Footer {...this.props} />
      </div>
    );
  }
}

export default AggiungiStruttura;