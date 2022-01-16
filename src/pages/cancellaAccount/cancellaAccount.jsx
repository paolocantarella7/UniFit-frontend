import React from 'react';
import ConnectedHeader from '../../components/header/header';
import Footer from '../../components/footer/footer'
import Server from "../../config.json";

import { Redirect } from 'react-router-dom';



// cancellaAccuont page
class CancellaAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: false,
      username: "",
      pass: "",
      errors: {},
      loading: false
    }
  }

  effettuaCancellazione = () => {
    let user = localStorage.getItem("currentUser");
    user = JSON.parse(user);
    var url = Server.API_URL+`user/cancellaAccount?idUtente=${user.id}`
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ structure: responseJson.struttura }, () => {
          this.setState({ loading: false })
        })
      })
      .catch(error => console.log(error))
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLogged", false);

    window.location.assign(Server.FRONT_URL);
  }
  render() {
    return (
        <div>
          <ConnectedHeader {...this.props} />
          <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
            <p className="pt-4">Confermi di voler cancellare il tuo account definitivamente?</p>
            <div className="row py-3 px-3">
              <button type="button" class="btn btn-danger btn-lg mx-auto bg-cyan border h3 col-xs-12 col-md-8" data-toggle="modal" data-target="#exampleModalLong" >Cancella Account</button>
            </div>
          </div>
          <div class="modal" id="exampleModalLong" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p>Sicuro di cancellare l'account?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" onClick={this.effettuaCancellazione}>Cancella</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
                </div>
              </div>
            </div>
          </div>
          <Footer {...this.props} />
        </div>
      )

  }
}
export default CancellaAccount;