import React from "react";
import Footer from "../../components/footer/footer";
import ConnectedHeader from "../../components/header/header";
import { Link, Redirect } from "react-router-dom";
import "./areaPersonaleUtente.scss";
import AreaPersonaleUtenteSvg from "../../areaPersonaleUtente.svg";

class AreaPersonaleUtente extends React.Component {
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
          <div className="page">
            <ConnectedHeader {...this.props} />
            <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
              <h1 className="pt-4">Area personale utente</h1>
              <div className="row py-3 px-3">
                <button
                  type="button"
                  className="btn btn-primary btn-lg mx-auto bg-cyan border h3 col-xs-12 col-md-8"
                >
                  Le mie prenotazioni
                </button>
              </div>
              <Link to={"/editPassword"} className={`nav-link`}>
                <div className="row py-3 px-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
                  >
                    Modifica password
                  </button>
                </div>
              </Link>
              <Link to={"/userDetails"} className={`nav-link`}>
                <div className="row py-3 px-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
                  >
                    Visualizza informazioni personali
                  </button>
                </div>
              </Link>
              <Link to={"/deleteAccount"} className={`nav-link`}>
                <div className="row py-3 px-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
                  >
                    Cancella account
                  </button>
                </div>
              </Link>

              <img className="pt-3 pb-4 img-fluid mx-auto" width={180} src={AreaPersonaleUtenteSvg} alt="React Logo" />

            </div>

            <Footer {...this.props} />
          </div>
        );
      }
    }
  }
}
export default AreaPersonaleUtente;
