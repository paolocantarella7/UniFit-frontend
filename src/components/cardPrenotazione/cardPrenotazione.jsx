import React from "react";
import { Card } from 'react-bootstrap';

class CardPrenotazione extends React.Component {
    render(){
        return(
            <>
                <Card className="h-100 w-100 d-inline-block " style={{margin: "10px 0px"}}> 
                    <Card.Body>
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <Card.Title className="text-dark align-self-center">{this.props.prenotazione.idPrenotazione+" " +this.props.prenotazione.utentePrenotato.email}</Card.Title>
                            </div>
                            <div className="col-md-4">
                                <Card.Title className="text-dark align-self-center">{this.props.prenotazione.dataPrenotazione}</Card.Title>
                            </div>
                            <div className="col-md-4 ">
                                <Card.Title className="text-dark align-self-center">{this.props.prenotazione.oraInizio +" " +this.props.prenotazione.oraFine}</Card.Title>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default CardPrenotazione;