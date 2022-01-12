import React from 'react';
import { Card } from 'react-bootstrap';

class RichiestaDiTesseramento extends React.Component{
    render(){
        return (
            <>
            <Card className="h-100 w-100 d-inline-block" style={{margin: "10px 0px"}}> 
                <Card.Body>
                    <div className="row justify-content-between">
                        <div className="d-flex align-items-start mx-auto">
                            <Card.Title className="text-dark align-self-center">
                                    {this.props.request.utenteRichiedente.nome} {this.props.request.utenteRichiedente.cognome}
                            </Card.Title>
                        </div>
                        <div className="col-8 mx-auto">
                            <button type="button" className="col-12 col-lg-3 btn btn-primary mx-1 my-2">Documenti</button>
                            <button type="button" className= "col-12 col-lg-3 btn btn-success mx-1 my-2" data-toggle="modal" data-target="#modalValida" >Valida</button>
                            <button type="button" className="col-12 col-lg-3 btn btn-danger mx-1 my-2" data-toggle="modal" data-target="#modalDeclina" >Declina</button>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <div className="modal" id="modalValida" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Sei sicuro di voler approvare questa richiesta di tesseramento?</p>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.props.onDelete(this.props.struttura.id)}>Conferma</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="modalDeclina" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Sei sicuro di voler declinare questa richiesta di tesseramento?</p>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.onDelete(this.props.struttura.id)}>Conferma</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default RichiestaDiTesseramento;


                    