import React  from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import MultipleDatePicker from "../../components/datePicker/datePicker";
import FormStruttura from "../../components/formStruttura/formStruttura";



class AggiungiStruttura extends React.Component {
    state = {
      nome:"",
      prezzoPerFascia:"",
      durataFascia:"",
      dataInizio:"",
      capacitaPerFascia:"",
      oraIM:"",
      oraFM:"",
      oraIP:"",
      oraFP:"",
      dateChiusura:[],

      errors:[],
    };



    render() {
        return (
          <div>
            <ConnectedHeader
              {...this.props}
              currentUser={new User("admin", "Luigi")}
              type= "admin"
            />
            
            
            <div className="container-fluid text-dark rounded col-10 col-sm-10 col-lg-7 col-xl-6 text-center bg-white my-4 py-4">
              <h1 className="pt-4">Aggiungi Struttura</h1>

              <FormStruttura></FormStruttura>

            </div>
                


            <Footer {...this.props} />

            {/*
            <div className="modal" id="modalDatePicker" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body mx-auto">
                    <MultipleDatePicker/>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onChange} >Salva</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                    </div>
                  </div>
                </div>
            </div>*/}
            </div>
        );

      }
}

export default AggiungiStruttura;