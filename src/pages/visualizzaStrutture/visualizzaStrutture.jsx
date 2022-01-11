import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import CardStruttura from "../../components/cardStruttura/cardStruttura";

class VisualizzaStrutture extends React.Component {
  state = {
    structures:[
      { id: 0, idStruttura: 1, nomeStruttura: "Campo da calcetto", prezzoFascia: 10, durataFascia: 1, capacitaFascia: 1, dataInizioDisponibilita: "24-01-2022", oraIM: "09:00", oraFM: "13:00", oraIP: "15:00", oraFP: "20:00"},
      { id: 1, idStruttura: 2, nomeStruttura: "Palestra" , prezzoFascia: 5, durataFascia: 2, capacitaFascia: 20, dataInizioDisponibilita: "24-02-2022", oraIM: "09:00", oraFM: "13:00", oraIP: "16:00", oraFP: "20:00"},
      { id: 2, idStruttura: 3, nomeStruttura: "Campo da tennis" , prezzoFascia: 10, durataFascia: 1, capacitaFascia: 1, dataInizioDisponibilita: "26-01-2022", oraIM: "09:00", oraFM: "13:00", oraIP: "15:00", oraFP: "20:00"},
      { id: 3, idStruttura: 4, nomeStruttura: "Piscina" , prezzoFascia: 10, durataFascia: 1, capacitaFascia: 15, dataInizioDisponibilita: "24-01-2022", oraIM: "09:00", oraFM: "13:00", oraIP: "15:00", oraFP: "20:00" },
      { id: 4, idStruttura: 5, nomeStruttura: "Campo da basket" , prezzoFascia: 10, durataFascia: 1, capacitaFascia: 1, dataInizioDisponibilita: "24-01-2022", oraIM: "09:00", oraFM: "13:00", oraIP: "15:00", oraFP: "20:00"},
    ]
  }

  /*
  const fetchStructures = async () => {
    const data = await fetch(
      'htts://.......'
    );
    
    const structures = await data.json();
    console.log(structures.)
  }
  */

  handleDelete = strutturaId => {
    const structures = this.state.structures.filter(struttura => struttura.id !== strutturaId);
    //fai cose con il back
    this.setState({structures});
  }
    render() {
        return (
          <>
            <ConnectedHeader
              {...this.props}
              currentUser={new User("admin", "Luigi")}
              type= "admin"/>
            
            <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
              <h1 className="pt-4">Visualizza strutture</h1>

              <div className='col'>
                {(this.state.structures.length == 0) ? (
                  <p>Non ci sono strutture!</p>
                ):(
                  this.state.structures.map(struttura =>(
                  <CardStruttura
                    key = {struttura.id}
                    onDelete = {this.handleDelete}
                    struttura = {struttura} />   
                  )))
                }
              </div>

            </div>
            <Footer {...this.props} />
            </>
        );
      }
}

export default VisualizzaStrutture;