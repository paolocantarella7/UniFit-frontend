import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import CardStruttura from "../../components/cardStruttura/cardStruttura";

class VisualizzaStrutture extends React.Component {
  state = {
    structures:[
      { id: 0, idStruttura: 1, nomeStruttura: "Campo da calcetto" },
      { id: 1, idStruttura: 2, nomeStruttura: "Palestra" },
      { id: 2, idStruttura: 3,nomeStruttura: "Campo da tennis" },
      { id: 3, idStruttura: 4,nomeStruttura: "Piscina" },
      { id: 4, idStruttura: 5,nomeStruttura: "Campo da basket" },
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

              <div className='col'>
                {(this.state.structures.length == 0) ? (
                  <p>Non ci sono strutture!</p>
                ):(
                  this.state.structures.map(struttura =>(
                    console.log("safafsa"),
                  <CardStruttura
                    key = {struttura.id}
                    struttura = {struttura} />   
              )))}
              </div>

            </div>
            <Footer {...this.props} />
            </>
        );
      }
}

export default VisualizzaStrutture;