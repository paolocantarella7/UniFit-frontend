import React from "react";
import Footer from "../../components/footer/footer";
import ConnectedHeader from "../../components/header/header";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import AreaAmministratoreSvg from "../../areaAmministratore.svg";


class AreaAmministratore extends React.Component {
  render() {
    if (localStorage.getItem('isLogged') === 'true') {

      let user = localStorage.getItem('currentUser')
      user = JSON.parse(user);

      if (!user.isAdmin) {
        return <Redirect to="/home" />;
      }
    }
    return (
      <div className="page">
        <ConnectedHeader
          {...this.props}
        />
        <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
          <h1 className="pt-4">Area Amministratore</h1>
          <Link to={"/addStructure"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Aggiungi Struttura
              </button>
            </div>
          </Link>
          <Link to={"/showStructures"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Visualizza strutture
              </button>
            </div>
          </Link>
          <Link to={"/showUsers"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Visualizza utenti registrati
              </button>
            </div>
          </Link>
          <Link to={"/showMembershipRequests"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Visualizza richieste di tesseramento
              </button>
            </div>
          </Link>
          <Link to={"/editPassword"} className={`nav-link`}>
            <div className="row py-3 px-3">
              <button
                type="button"
                className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8 mb-4"
              >
                Modifica password
              </button>
            </div>
          </Link>
          <img alt="Area amministratore" className="pt-3 pb-4 img-fluid mx-auto" width="180" src={AreaAmministratoreSvg} />
        </div>

        <Footer {...this.props} />
      </div>
    );
  }
}

export default AreaAmministratore;
