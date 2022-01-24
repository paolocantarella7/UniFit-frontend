import React from "react";
import ConnectedHeader from '../../components/header/header';
import RichiestaDiTesseramento from "../../components/richiestaDiTesseramento/richiestaDiTesseramento";
import Footer from "../../components/footer/footer";
import Server from '../../config.json'
import { Redirect } from 'react-router-dom';
import NessunaRichiestaSvg from "../../nessunaPrenotazione.svg";

class VisualizzaRichiesteDiTesseramento extends React.Component {
  state = {
    loading: true,
    requests: [],
    selectedRequest: {},
  }
  componentDidMount() {
    this.getReq()
  }

  getReq() {
    var url = Server.API_URL + "admin/reqtess/visualizzareqtess"
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ requests: responseJson.richiesteTess }, () => {
          this.setState({ loading: false })
        })
      })
      .catch(error => console.log(error))
  }

  approvaRichiesta = () => {

    var url = Server.API_URL + "admin/reqtess/validatesseramento"

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        azione: 'accetta',
        idReqTess: this.state.selectedRequest.idRichiesta_tesseramento,
        idUtente: this.state.selectedRequest.utenteRichiedente.idUtente,
      })
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson.code === '200') {
          this.getReq();
        }
        window.location.reload(false);
      })
  }

  declinaRichiesta = () => {
  
    var url = Server.API_URL + "admin/reqtess/validatesseramento"

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        azione: 'rifiuta',
        idReqTess: this.state.selectedRequest.idRichiesta_tesseramento,
        idUtente: this.state.selectedRequest.utenteRichiedente.idUtente,
      })
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.code === '200') {
          this.getReq();
        }
        window.location.reload(false);
      })
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
        <div className="page-small">
          <ConnectedHeader {...this.props} />

          <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
            <h1 className="pt-4">Caricamento richieste di tessseramento</h1>
          </div>

          <Footer {...this.props} />
        </div>
        :
        <div className="page-small">
          <div>
            <ConnectedHeader {...this.props} />

            <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
              <h1 className="pt-4 text-cyan">Richieste di tesseramento</h1>

              <div className='col'>
                {(this.state.requests.length === 0) ? (
                  <div className="mb-4">
                    <img alt="Nessuna richiesta di tesseramento" className="my-5" width="200" src={NessunaRichiestaSvg} />
                    <p className="pb-4">Non ci sono richieste</p>
                  </div>
                ) : (
                  this.state.requests.map(request => (
                    <RichiestaDiTesseramento key={request.id} request={request} onPress={
                      (data) => this.setState({
                        selectedRequest: data,
                      })
                    } />
                  )))
                }
              </div>

            </div>
            <Footer {...this.props} />
          </div>
          <div className="modal" id="modalValida" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <p>Sei sicuro di voler approvare questa richiesta di tesseramento?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.approvaRichiesta}>Conferma</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal" id="modalDeclina" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <p>Sei sicuro di voler declinare questa richiesta di tesseramento?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.declinaRichiesta}>Conferma</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default VisualizzaRichiesteDiTesseramento;