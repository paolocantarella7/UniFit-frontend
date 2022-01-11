import React from "react";
import ConnectedHeader from '../../components/header/header';
import RichiestaDiTesseramento from "../../components/richiestaDiTesseramento/richiestaDiTesseramento";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";

class VisualizzaRichiesteDiTesseramento extends React.Component {
  state = {
    users: [
      {
        id: 0,
        nomeUtente: "Luigi",
        cognomeUtente: "Allocca",
      },
      {
        id: 1,
        nomeUtente: "ada",
        cognomeUtente: "Alloadaacca",
      }
    ]
  }
  render() {
    return (
      <div>
        <ConnectedHeader
          {...this.props}
          currentUser={new User("admin", "Luigi")}
          type= "admin"
        />

        <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
            <h1 className="pt-4">Richieste di tessseramento</h1>
            
            <div className='col'>
              {(this.state.users.length == 0) ? (
                <p>Non ci sono richieste!</p>
              ):(
                this.state.users.map(user => (
                  <RichiestaDiTesseramento key={user.id} user= {user} />
                )))
              }
            </div>

          </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default VisualizzaRichiesteDiTesseramento;