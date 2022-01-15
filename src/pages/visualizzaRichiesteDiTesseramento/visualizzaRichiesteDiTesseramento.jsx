import React from "react";
import ConnectedHeader from '../../components/header/header';
import RichiestaDiTesseramento from "../../components/richiestaDiTesseramento/richiestaDiTesseramento";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";

class VisualizzaRichiesteDiTesseramento extends React.Component {
  state = {
    loading: true,
    requests: []
  }
  componentDidMount() {
    this.getReq()
  }

  getReq() {
    var url = "admin/reqtess/visualizzareqtess"
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ requests: responseJson.richiesteTess }, () => {
          this.setState({ loading: false })
        })
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
                  <h1 className="pt-4">Caricamento richieste di tessseramento</h1>
                </div>
            
                <Footer {...this.props} />
              </> 
            :
              <>
                <div>
                  <ConnectedHeader
                    {...this.props}
                    currentUser={new User("admin", "Luigi")}
                    type= "admin"/>

                  <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
                      <h1 className="pt-4">Richieste di tessseramento</h1>
                      
                      <div className='col'>
                        {(this.state.requests.length == 0) ? (
                          <p>Non ci sono richieste!</p>
                        ):(
                          this.state.requests.map(request => (
                            <RichiestaDiTesseramento key={request.id} request= {request} />
                          )))
                        }
                      </div>

                  </div>
                  <Footer {...this.props} />
                </div>
            </>
          );
        }
      }

      export default VisualizzaRichiesteDiTesseramento;