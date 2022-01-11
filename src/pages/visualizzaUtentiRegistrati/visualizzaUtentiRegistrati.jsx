import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import CardUtente from "../../components/cardUtente/cardUtente";

class VisualizzaUtentiRegistrati extends React.Component {
  state = {
    users:[
      {id: 0, nome: "Paolo", cognome: "Cantarella"},
      {id: 1, nome: "Davide", cognome: "Bottiglieri"},
      {id: 2, nome: "Matteo", cognome: "Della Rocca"},
      {id: 3, nome: "Luca", cognome: "Boffa"},
      {id: 4, nome: "Luigi", cognome: "Allocca"},
      {id: 5, nome: "Francesco", cognome: "Paciello"},
      {id: 6, nome: "Giuseppe", cognome: "Scafa"},
    ]
  }

    render() {
        return (
          <>
            <ConnectedHeader
              {...this.props}
              currentUser={new User("admin", "Luigi")}
              type= "admin"/>
            
            <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
              <h1 className="pt-4">Utenti Registrati</h1>
              
              <div className='col'>
                {(this.state.users.length == 0) ? (
                  <p>Non ci sono utenti!</p>
                ):(
                  this.state.users.map(utente =>(
                  <CardUtente
                    key = {utente.id}
                    utente = {utente} />   
                  )))
                }
              </div>

            </div>
            <Footer {...this.props} />
            </>
        );
      }
}

export default VisualizzaUtentiRegistrati;