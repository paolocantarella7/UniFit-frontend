import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";
import CardStruttura from "../../components/cardStruttura/cardStruttura";
import Server from "../../config.json";

class VisualizzaStrutture extends React.Component {
  state = {
    structures:[],
    loading: true
  }

  componentDidMount() {
    this.struttureGet()
  }

  struttureGet() {
    var url = Server.API_URL+"admin/strutture/visualizzastrutture"
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ structures: responseJson.strutture }, () => {
          this.setState({ loading: false })
        })
      })
      .catch(error => console.log(error))
  }


  handleDelete = strutturaId => {
      this.setState({ loading: true })
      var url = Server.API_URL+`admin/strutture/eliminastruttura?idStrutt=${strutturaId}`
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            if(responseJson.code === '200')
            {
              this.struttureGet(); 
            }
              window.location.reload(false);
        })
        .catch(error => console.log(error))
  }

    render() {
        return (
          this.state.loading ?
          <>
          <ConnectedHeader
            {...this.props}
           currentUser={new User("admin", "Luigi")}
            type= "admin"/>
          
          <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
            <h1 className="pt-4">Caricamento Strutture</h1>
          </div>
          
          <Footer {...this.props} />
          </>
          :
          <>
            <ConnectedHeader
              {...this.props}
              currentUser={new User("admin", "Luigi")}
              type= "admin"/>
            
            <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
              <h1 className="pt-4">Visualizza strutture</h1>

              <div className='col'>
                {(this.state.structures.length === 0) ? (
                  <p>Non ci sono strutture!</p>
                ):(
                  this.state.structures.map(struttura =>(
                  <CardStruttura
                    key = {struttura.id}
                    onDelete = {this.handleDelete}
                    struttura = {struttura} />   
                  )))
                }
              </div>

            </div>
            <Footer {...this.props} />
            </>
        );
      }
}

export default VisualizzaStrutture;