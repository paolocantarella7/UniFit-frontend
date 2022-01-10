import React from "react";
import Footer from "../../components/footer/footer";
import ConnectedHeader from "../../components/header/header";

class ModificaPassword extends React.Component {
  render() {
    return (
      <div>
        <ConnectedHeader {...this.props} />
        <form className="container-fluid text-dark rounded col-10 col-md-6 text-center bg-white my-4 py-4">
          <h1 className="pt-4">Modifica password</h1>

          <div class="form-group py-2">
            <input
              type="password"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Inserisci la nuova password..."
            />
          </div>
          <div class="form-group py-2">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Conferma la nuova password..."
            />
          </div>
          <button
            type="button"
            class="btn btn-primary bg-cyan border col-6 rounded"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            SALVA
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Avvertenza
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Annulla"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Sei sicuro di voler modificare la tua password?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Annulla
                  </button>
                  <button type="button" class="btn btn-primary">
                    Conferma
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default ModificaPassword;
