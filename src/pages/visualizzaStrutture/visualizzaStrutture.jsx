import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CardStruttura from "../../components/cardStruttura/cardStruttura";
import Server from "../../config.json";
import { Redirect } from 'react-router-dom';
import Loading from "../../components/loading/loading";

class VisualizzaStrutture extends React.Component {
  state = {
    structures: [],
    loading: true,
    idToDelete: -1,
  }

  componentDidMount() {
    this.struttureGet()
  }

  struttureGet() {
    var url = Server.API_URL + "admin/strutture/visualizzastrutture"
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ structures: responseJson.strutture }, () => {
          this.setState({ loading: false })
        })
      })
      .catch(error => console.log(error))
  }


  handleDelete = () => {
    this.setState({ loading: true })
    var url = Server.API_URL + `admin/strutture/eliminastruttura?idStrutt=${this.state.idToDelete}`
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code === '200') {
          this.struttureGet();
        }
        window.location.reload(false);
      })
      .catch(error => console.log(error))
  }

  render() {
    if (localStorage.getItem('isLogged') === 'true') {
      
      let user = localStorage.getItem('currentUser')
      user = JSON.parse(user);

      if (!user.isAdmin) {
        return <Redirect to="/home" />
      }
    } 
    return (
      this.state.loading ?
        <div className="page">
          <ConnectedHeader/>
    

          <Loading/>


          <Footer {...this.props} />
        </div>
        :
        <div className="page">
          <ConnectedHeader {...this.props} />

          <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
            <h1 className="pt-4 text-cyan">Visualizza strutture</h1>

            <div className='col'>
              {(this.state.structures.length === 0) ? (
                <p>Non ci sono strutture!</p>
              ) : (
                this.state.structures.map(struttura => (
                  <CardStruttura
                    key={struttura.id}
                    onPress={(id) => this.setState({ idToDelete: id })}
                    struttura={struttura} />
                )))
              }
            </div>

          </div>
          <Footer {...this.props} />

          <div className="modal" id="modalElimina" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <p>Sicuro di cancellare la struttura??</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.handleDelete()}>Cancella</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                </div>
              </div>
            </div>
          </div>

        </div>
    );
  }
}

export default VisualizzaStrutture;