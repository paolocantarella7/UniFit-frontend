import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

class CardStruttura extends React.Component {
  state = {
    struttura : this.props.struttura,
  }
    render(){
        return(
            <>
              <Card className="h-100 w-100 d-inline-block " style={{margin: "10px 0px"}}>
                <Card.Body>
                    <div className="row justify-content-between">
                      <div className="d-flex align-items-start  mx-auto">
                        <Card.Title className="text-dark align-self-center">{this.props.struttura.nomeStruttura}</Card.Title>
                      </div>
                      <div className="col-md-4 ">
                        <Link to="/" className="navbar-brand">
                          <img className="img-responsive" src="assets/images/info.png" alt="info" style={{height: "25px" ,width: "25px"}}/>
                        </Link>
                        <Link to="/showStructures" className="navbar-brand">
                          <img className="img-responsive" src="assets/images/delete.png" alt="delete"  data-toggle="modal" data-target="#modalElimina"  style={{height: "25px" ,width: "25px"}}/>
                        </Link>
                        <Link to={`/editStructure/${this.props.struttura.idStruttura}`} className="navbar-brand">
                          <img className="img-responsive" src="assets/images/edit.png" alt="modify"  style={{height: "50px" ,width: "50px"}}/>
                        </Link>
                      </div>
                  </div>
                </Card.Body>
              </Card>
          
              <div className="modal" id="modalElimina" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                      <p>Sicuro di cancellare la struttura??</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.onDelete(this.props.struttura.id)}>Cancella</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                    </div>
                  </div>
                </div>
              </div>
            
            </>
        );
    }
}

export default CardStruttura;