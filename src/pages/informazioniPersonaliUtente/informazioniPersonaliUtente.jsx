import React from 'react';
import Footer from '../../components/footer/footer'
import ConnectedHeader from '../../components/header/header'
import './informazioniPersonaliUtente.scss';
import InformazioniPersonaliSvg from "../../informazioniPersonali.svg";
import { Redirect } from 'react-router-dom'

class InformazioniPersonaliUtente extends React.Component {
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
            <div className="w-75 bg-white mx-auto pb-5 my-5 rounded">
              <div className="row">
                <h1 className="mx-auto pt-4 text-cyan text-center px-4">Info Su {user.nome} {user.cognome}</h1>
              </div>
              <div className="container  my-4">

                <div className="row">
                  <h4 className="mx-auto text-cyan">Email</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{user.email}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Codice fiscale</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{user.codiceFiscale}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Indirizzo</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{user.indirizzoResidenza}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Telefono</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{user.numeroTelefono}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Data di nascita</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{user.dataNascita}</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Nazionalità</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">{user.nazionalita}</p>
                </div>
                <div className="row">
                  <img className="pt-5 img-fluid mx-auto" width={180} src={InformazioniPersonaliSvg} alt="React Logo" />
                </div>
              </div>
            </div>

            <Footer />
          </div>
        );
      }
    }
  }
}
export default InformazioniPersonaliUtente;
