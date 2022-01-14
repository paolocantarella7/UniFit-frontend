import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import $ from "jquery";

class CardStruttura extends React.Component {
  state = {
    struttura : this.props.struttura,
  }

    render(){
        return(
            <>
              <Card className="h-100 w-100 d-inline-block " id={this.props.struttura.idStruttura} style={{margin: "10px 0px"}}>
                <Card.Body>
                    <div className="row justify-content-between">
                      <div className="d-flex align-items-start mx-auto">
                        {this.props.struttura.isCancellata == 0 ?
                        <Card.Title className="text-dark align-self-center">{this.props.struttura.nome}</Card.Title>
                        :
                        <Card.Title className="text-dark align-self-center"><del>{this.props.struttura.nome}</del></Card.Title>
                        }
                      </div>
                      <div className="col-md-4 ">
                      {this.props.struttura.isCancellata == 0 ?
                        <>
                        <Link to={`/structureDetails/${this.props.struttura.idStruttura}`} className="navbar-brand">
                          <img className="img-responsive" src="assets/images/info.png" alt="info" style={{height: "25px" ,width: "25px"}}/>
                        </Link>
                        <Link to="/showStructures" className="navbar-brand">
                          <img className="img-responsive" src="assets/images/delete.png" alt="delete" alt="delete"  onClick={() => this.props.onDelete(this.props.struttura.idStruttura)} style={{height: "25px" ,width: "25px"}}/>
                        </Link>
                        <Link to={`/editStructure/${this.props.struttura.idStruttura}`} className="navbar-brand">
                          <img className="img-responsive" src="assets/images/edit.png" alt="modify"  style={{height: "25px" ,width: "25px"}}/>
                        </Link>
                        </>
                        :
                        <Link to={`/structureDetails/${this.props.struttura.idStruttura}`} className="navbar-brand">
                        <img className="img-responsive" src="assets/images/info.png" alt="info" style={{height: "25px" ,width: "25px"}}/>
                        </Link>
                      }
                      </div>
                  </div>
                </Card.Body>
              </Card>
          
              <div className="modal" id={`modalElimina${this.props.struttura.id}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                      <p>Sicuro di cancellare la struttura??</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.onDelete(this.props.struttura.idStruttura)}>Cancella</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                      {console.log(this.props.struttura.idStruttura)}
                    </div>
                  </div>
                </div>
              </div>

            </>
        );
    }
}

export default CardStruttura;