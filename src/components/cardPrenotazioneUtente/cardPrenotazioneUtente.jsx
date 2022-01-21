import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

class CardPrenotazioneUtente extends React.Component {
  state = {
    struttura: this.props.prenotazione,
  }

  render() {
    return (
        <Card className="h-100 w-100 d-inline-block " id={this.props.prenotazione.idPrenotazione} style={{ margin: "10px 0px" }}>
          <Card.Body>
            <div className="row justify-content-between">
              <div className="d-flex align-items-start mx-auto">
                <Card.Title className="text-dark align-self-center">{this.props.prenotazione.strutturaPrenotata.nome} {this.props.prenotazione.dataPrenotazione}</Card.Title>
              </div>
              <div className="col-md-4 ">
                <Link to="/showStructures" className="navbar-brand">
                    <img className="img-responsive" src="assets/images/delete.png" alt="delete" data-toggle="modal" data-target="#modalElimina" onClick={() => this.props.onPress(this.props.struttura.idStruttura)} style={{ height: "25px", width: "25px" }} />
                </Link>
                <Link to={`/editReservation/${this.props.prenotazione.idPrenotazione}`} className="navbar-brand">
                    <img className="img-responsive" src="assets/images/edit.png" alt="modify" style={{ height: "25px", width: "25px" }} />
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
    );
  }
}

export default CardPrenotazioneUtente;