import React from 'react';
import Footer from '../../components/footer/footer'
import ConnectedHeader from '../../components/header/header'
import './informazioniPersonaliUtente.scss';

class InformazioniPersonaliUtente extends React.Component {

  render() {
    return (
      <div>
          <ConnectedHeader {...this.props}/>
          <div className="w-75 bg-white mx-auto pb-5 my-5 rounded">
              <div className="row">
                <h1 className="mx-auto pt-4 text-cyan text-center px-4">Informazioni personali</h1>
              </div>
              <div className="container  my-4">
                <div className="row">
                  <h4 className="mx-auto text-cyan">Nome</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">Pinco</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Cognome</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">Pallino</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Email</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">pinco.pallino@studenti.unisa.it</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Codice fiscale</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">PCLFNC19S19H931X</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Indirizzo</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">VIA ROMA 25</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Telefono</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">1234567890</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Data di nascita</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">09/11/2000</p>
                </div>
                <div className="row">
                  <h4 className="mx-auto text-cyan">Nazionalità</h4>
                </div>
                <div className="row">
                  <p className="mx-auto text-black">ITALIANA</p>
                </div>
              </div>
            </div>
          <Footer />
      </div>
    )
  }
}

export default InformazioniPersonaliUtente;