import React from "react";
import Footer from "../../components/footer/footer";
import ConnectedHeader from "../../components/header/header";
import { Link } from "react-router-dom";
import "./areaPersonaleUtente.scss";

class AreaPersonaleUtente extends React.Component {
  render() {
    return (
      <div>
        <ConnectedHeader {...this.props} />
        <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
          <h1 className="pt-4">Area personale utente</h1>
          <Link to={"/viewReservations"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                class="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Le mie prenotazioni
              </button>
            </div>
          </Link>
          <Link to={"/editPassword"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                class="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Modifica password
              </button>
            </div>
          </Link>
          <Link to={"/userDetails"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                class="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Visualizza informazioni personali
              </button>
            </div>
          </Link>
          <Link to={"/deleteAccount"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                class="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Cancella account
              </button>
            </div>
          </Link>
        </div>

        <Footer {...this.props} />
      </div>
    );
  }
}

export default AreaPersonaleUtente;
