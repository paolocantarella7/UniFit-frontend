import React from 'react';
import './homepage.scss'
import HomeSearch from '../../components/homeSearch/homesearch'
import Popular from '../../components/popularLocations/popular'
import ConnectedHeader from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Register from '../../components/Register/Register'
import Loading from '../../components/loading/loading'
import './homepage.scss';
import Latest from '../../components/latest_doctors/doctors'


// Homepage
class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (<div>
      <div className="doctorSearch loginSignupTop">
        <h3 className="text-center text-white">Benvenuto su Unifit</h3>
      </div>
    </div>)
  }
}

export default HomePage;