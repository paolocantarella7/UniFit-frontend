import React from 'react';
import { Card } from 'react-bootstrap';
import Server from '../../config.json';
import saveAs from 'file-saver';

class RichiestaDiTesseramento extends React.Component{

    saveFile = () => {
        saveAs(
            Server.API_URL+"admin/reqtess/downloadCertificato/"+this.props.request.idRichiesta_tesseramento, 
            "certificatoDownload.pdf"
        );
    };

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
                            <button type="button" className="col-12 col-lg-3 btn btn-primary mx-1 my-2" onClick={this.saveFile}>Documenti</button>
                            <button type="button" className= "col-12 col-lg-3 btn btn-success mx-1 my-2"  data-toggle="modal" data-target="#modalValida" onClick={() => this.props.onPress(this.props.reques)}>Valida</button>
                            <button type="button" className="col-12 col-lg-3 btn btn-danger mx-1 my-2"  data-toggle="modal" data-target="#modalDeclina" onClick={() => this.props.onPress(this.props.request)}>Declina</button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            </>
        );
    }
}

export default RichiestaDiTesseramento;


                    