import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsClock } from 'react-icons/bs'
import { BsCalendar3 } from 'react-icons/bs'



class CardPrenotazioneUtente extends React.Component {
  state = {
    prenotazione: this.props.prenotazione,
  };

  render() {
    var oggi = moment().format('YYYY-MM-DD , hh:mm:ss a')
    var dataPrenotazione = moment(this.state.prenotazione.dataPrenotazione).format(`YYYY-MM-DD , ${this.state.prenotazione.oraInizio}`)

    if (moment(oggi).isBefore(dataPrenotazione) === true) {
      return (
        <Card
          className="h-100 w-100 d-inline-block border-0"
          id={this.props.prenotazione.idPrenotazione}
          style={{ margin: "10px 0px" }}
        >
          <Card.Body>
            <div className="row justify-content-between">
              <div className="d-flex align-items-start mx-auto">
                <Card.Title className=" align-self-center">
                  <div className="text-center">
                    <div className="h4 row py-2 text-cyan font-weight-bold text-center">
                      {this.props.prenotazione.strutturaPrenotata.nome}
                    </div>

                    <div className="row pb-2 font-weight-light text-center">
                    <BsCalendar3 className="mr-2"/>{this.props.prenotazione.dataPrenotazione}
                    </div>

                    <div className="row font-weight-light text-center">
                    <BsClock className="mr-2"/> {this.props.prenotazione.oraInizio} / {this.props.prenotazione.oraFine}
                    </div>
                  </div>
                </Card.Title>
              </div>
              <div className="col-md-4 ">
                <Link to="/viewReservations" className="navbar-brand">
                  <img
                    className="img-responsive"
                    src="assets/images/delete.png"
                    alt="delete"
                    data-toggle="modal"
                    data-target="#modalEliminaPrenotazione"
                    onClick={() =>
                      this.props.onPress(this.props.prenotazione.idPrenotazione)
                    }
                    style={{ height: "25px", width: "25px" }}
                  />
                </Link>
                <Link
                  to={`/editReservation/${this.props.prenotazione.idPrenotazione}`}
                  className="navbar-brand"
                >
                  <img
                    className="img-responsive"
                    src="assets/images/edit.png"
                    alt="modify"
                    style={{ height: "25px", width: "25px" }}
                  />
                </Link>
              </div>
            </div>
          </Card.Body>
          <hr />
        </Card>
      );
    } else {
      return (
        <Card
          className="h-100 w-100 d-inline-block "
          id={this.props.prenotazione.idPrenotazione}
          style={{ margin: "10px 0px" }}
        >
          <Card.Body>
            <div className="row justify-content-between">
              <div className="d-flex align-items-start mx-auto">
                <Card.Title className="align-self-center">
                <div className="text-center">
                    <div className="h4 row py-2 text-cyan font-weight-bold text-center">
                      {this.props.prenotazione.strutturaPrenotata.nome}
                    </div>

                    <div className="row pb-2 font-weight-light text-center text-danger">
                    <BsCalendar3 className="mr-2"/>{this.props.prenotazione.dataPrenotazione}
                    </div>

                    <div className="row font-weight-light text-center text-danger">
                    <BsClock className="mr-2"/> {this.props.prenotazione.oraInizio} / {this.props.prenotazione.oraFine}
                    </div>
                  </div>
                </Card.Title>
              </div>
              <div className="col-md-4 ">
                <p>SCADUTA</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default CardPrenotazioneUtente;
