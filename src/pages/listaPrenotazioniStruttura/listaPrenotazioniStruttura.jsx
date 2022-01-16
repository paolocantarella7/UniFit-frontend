import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import CardPrenotazione from "../../components/cardPrenotazione/cardPrenotazione";
import Server from "../../config.json";
import { Redirect } from 'react-router-dom';

class ListaPrenotazioniStruttura extends React.Component {
  state = {
    structure:[],
    reservation:[],
    loading : true,
  }
  componentDidMount() {
    this.utentiGet()
  }

  utentiGet() {
    var url = Server.API_URL+`admin/strutture/prenotazioniStruttura/${this.props.match.params.id}`
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ reservation: responseJson.struttura.listaPrenotazioniStruttura , structure: responseJson.struttura }, () => {
          this.setState({ loading: false })
        })
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
          this.state.loading ?

            <>
              <ConnectedHeader
                {...this.props}
                currentUser={new User("admin", "Luigi")}
                type= "admin"/>
          
              <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
                <h1 className="pt-4">Caricamento prenotazioni</h1>
              </div>
          
              <Footer {...this.props} />
            </>
          :
            <>
              <ConnectedHeader
                {...this.props}
                currentUser={new User("admin", "Luigi")}
                type= "admin"/>
              
              <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
                <h1 className="pt-4">{`Prenotazioni di ${this.state.structure.nome}`}</h1>
                
                <div className='col'>
                  {(this.state.reservation.length == 0) ? (
                    <p>Non ci sono prenotazioni</p>
                  ):(
                    this.state.reservation.map(prenotazione =>(
                    <CardPrenotazione
                      key = {prenotazione.id}
                      prenotazione = {prenotazione} />   
                    )))
                  }
                </div>

              </div>
              <Footer {...this.props} />
            </>
        );
      }
}

export default ListaPrenotazioniStruttura;