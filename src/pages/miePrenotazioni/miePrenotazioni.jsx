import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import Server from "../../config.json";
import CardPrenotazioneUtente from "../../components/cardPrenotazioneUtente/cardPrenotazioneUtente";
import { toast } from "react-toastify";
import NessunaPrenotazioneSvg from "../../nessunaPrenotazione.svg";
import { Link } from "react-router-dom";


//  View Reservation page
class VisualizzaPrenotazioni extends React.Component {
  state = {
    prenotazioni: [],
    idToDelete: -1,
  };

  componentDidMount() {
    this.prenotazioniGet();
  }

  prenotazioniGet() {
    let user = localStorage.getItem("currentUser");
    user = JSON.parse(user);
    var url =
      Server.API_URL +
      "prenotazione/prenotazioniUtente?idUtente=" +
      user.idUtente;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ prenotazioni: responseJson.prenotazioni }, () =>
          this.setState({ loading: false })
        );
      })
      .catch((error) => console.log(error));
  }

  handleDelete = () => {
    this.setState({ loading: true });
    
    let user = localStorage.getItem("currentUser");
    user = JSON.parse(user);

    var data = new FormData();
    data.append("idPrenotazione", this.state.idToDelete);
    data.append("idUtente", user.idUtente);

    var url = Server.API_URL + `prenotazione/cancellaPrenotazione`;
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 200) {
          this.prenotazioniGet();

          this.setState({ loading: false });

          window.location.reload(false);
        } else if (responseJson.code === 400) {
          responseJson.error.map(error => {
            toast.error(error.msg, {
              autoClose: 5000,
              className: "errorToast"
            })
          })
          this.setState({ loading: false });
        }
      });
  };

  render() {
    if (localStorage.getItem("isLogged") === "false") {
      return <Redirect to="/" />;
    } else {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin === 1) {
        return <Redirect to="/adminArea" />;
      } else {
        return (
          <>
            <div className="page">
              <ConnectedHeader {...this.props} />
              <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4">
                <h1 className="py-4 text-cyan">Le mie prenotazioni</h1>
                {this.state.prenotazioni.length === 0 &&
                  <div className="mb-4">
                    <img className="my-5" width="200" src={NessunaPrenotazioneSvg} alt="Nessuna Prenotazione" />
                    <p className="pb-4">Non ci sono prenotazioni</p>

                    <Link to={`/makeReservation`} className={`nav-link`}>
                      <div className="row py-3 px-3">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg mx-auto bg-cyan border col-10 col-sm-7 col-md-5 mb-2">
                          Prenota una struttura
                        </button>
                      </div>
                    </Link>
                  </div>
                }

                {this.state.prenotazioni.map((prenotazione) => (
                  <CardPrenotazioneUtente
                    key={prenotazione.idPrenotazione}
                    prenotazione={prenotazione}
                    onPress={(id) => this.setState({ idToDelete: id })}
                  />
                ))}
              </div>
              <Footer {...this.props} />
            </div>

            <div
              className="modal"
              id="modalEliminaPrenotazione"
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <p>Sicuro di cancellare la prenotazione?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => this.handleDelete()}
                    >
                      Cancella
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Annulla
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    }
  }
}
export default VisualizzaPrenotazioni;
