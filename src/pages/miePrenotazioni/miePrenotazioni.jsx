import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import Server from "../../config.json";
import CardPrenotazioneUtente from "../../components/cardPrenotazioneUtente/cardPrenotazioneUtente";

// Login page
class VisualizzaPrenotazioni extends React.Component {
    state = {
        prenotazioni: []
    };

  componentDidMount() {
    this.prenotazioniGet()
  }

  prenotazioniGet() {
    let user = localStorage.getItem('currentUser')
    user = JSON.parse(user);
    var url = Server.API_URL + 'prenotazione/prenotazioniUtente?idUtente='+user.idUtente
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ prenotazioni: responseJson.prenotazioni })
      })
      .catch(error => console.log(error))
  }

  render() {
    if (localStorage.getItem("isLogged") === "false") {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin) {
        return <Redirect to="/adminArea" />;
      } else {
        return <Redirect to="/home" />;
      }
    } else {
      return (
        <div>
          <ConnectedHeader {...this.props} />
          <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4">
            <h3 className="py-4 text-cyan">Visualizza prenotazioni</h3>
            {
                this.state.prenotazioni.map(prenotazione => 
                <CardPrenotazioneUtente key={prenotazione.idPrenotazione} prenotazione={prenotazione}/>)
            }
          </div>
          <Footer {...this.props} />
        </div>
      );
    }
  }
}

export default VisualizzaPrenotazioni;
