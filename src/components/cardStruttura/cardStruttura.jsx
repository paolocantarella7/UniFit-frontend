import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

class CardStruttura extends React.Component {
    render(){
        return(
            <Card className="h-100 w-100 d-inline-block " style={{margin: "10px 0px"}}>
                
            <Card.Body>
                <div className="row justify-content-between">
                <div className="d-flex align-items-start">
              <Card.Title className="text-dark align-self-center">{this.props.struttura.nomeStruttura}</Card.Title>
                </div>
              <div className="col-md-4 ">
                <Link to="/" className="navbar-brand">
                    <img className="img-responsive" src="assets/images/info.png" alt="info" style={{height: "50px" ,width: "50px"}}/>
                </Link>
                <Link to="/" className="navbar-brand">
                    <img className="img-responsive" src="assets/images/delete.png" alt="delete"  style={{height: "50px" ,width: "50px"}}/>
                </Link>
                <Link to="/" className="navbar-brand">
                <img className="img-responsive" src="assets/images/edit.png" alt="modify"  style={{height: "50px" ,width: "50px"}}/>
                </Link>
              </div>
              </div>
            </Card.Body>
          </Card>
        );
    }
}

// props : dati passati da un componente padre

export default CardStruttura;