import React from "react";
import { Card } from 'react-bootstrap';

class CardUtente extends React.Component {
    render(){
        return(
            <>
                <Card className="h-100 w-100 d-inline-block " style={{margin: "10px 0px"}}> 
                    <Card.Body>
                        <div className="row justify-content-between">
                            <div className="d-flex align-items-start mx-auto">
                                <Card.Title className="text-dark align-self-center">{this.props.utente.nome +" " +this.props.utente.cognome}</Card.Title>
                            </div>
                            <div className="col-md-4 ">
                                <Card.Title className="text-dark align-self-center">{this.props.utente.isTesserato == 1 ? "Tesserato" : "Non tesserato"}</Card.Title>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default CardUtente;