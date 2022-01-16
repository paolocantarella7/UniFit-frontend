import React from 'react';
import ConnectedHeader from '../../components/header/header';
import Footer from '../../components/footer/footer'
import { Redirect} from 'react-router-dom';
import Server from "../../config.json";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// Login page
class EffettuaPrenotazione extends React.Component {
  constructor() {
    super();
    this.state = {
        structures: [],
        loading: true,
    }
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

  render() {
      console.log(this.state.structures)
    if (localStorage.getItem('isLogged') === 'false') {
      
      let user = localStorage.getItem('currentUser')
      user = JSON.parse(user);

      if (user.isAdmin) {
        return <Redirect to="/adminArea" />
      } else {
        return <Redirect to="/home" />
      }
    } else {
      return (
        <div>
          <ConnectedHeader {...this.props} />
          <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4 py-2">
            <h3 className="py-4 text-cyan">Effettua prenotazione</h3>
            <Form>
                <DropdownButton id="dropdown-basic-button" title="Seleziona struttura">
                    {
                        this.state.structures.map(struttura => (
                            <Dropdown.Item href={struttura.id}>{struttura.nome}</Dropdown.Item>
                        ))
                    }
                </DropdownButton>
                <button className="login_btn px-3">Prenota</button>
            </Form>
          </div>
          <Footer {...this.props} />
        </div>
      )
    }

  }
}

export default EffettuaPrenotazione;