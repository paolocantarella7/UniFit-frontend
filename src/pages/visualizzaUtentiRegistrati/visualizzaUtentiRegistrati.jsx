import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import CardUtente from "../../components/cardUtente/cardUtente";

class VisualizzaUtentiRegistrati extends React.Component {
  state = {
    users:[],
    loading : true,
  }
  componentDidMount() {
    this.utentiGet()
  }

  utentiGet() {
    var url = "admin/utenti/visualizzautenti"
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ users: responseJson.utentiRegistrati }, () => {
          this.setState({ loading: false })
        })
      })
      .catch(error => console.log(error))
  }

    render() {
        return (
          this.state.loading ?
          <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
            <h1 className="pt-4">Loading</h1>
          </div>
          :
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