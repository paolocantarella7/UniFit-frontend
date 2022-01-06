import React from 'react';
import {Switch, Route} from 'react-router-dom'
import AccountProvider from './providers/accountProvider'

import InformazioniPersonaliUtente from './pages/informazioniPersonaliUtente/informazioniPersonaliUtente'
import AreaPersonaleUtente from './pages/areaPersonaleUtente/areaPersonaleUtente'
import HomePage from './pages/homePage/homepage'
import SignUp from './pages/signUp/signUp'
import ConnectedLogin from './pages/login/login'
import ConnectedDoctorList from './pages/doctorList/doctorList'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recovery from './components/recovery/Recovery';
import ConnectedRecover from './pages/recovery/recover'; 
import SocialLink from './components/social_link/Sociallink';

import './App.css';
import ModificaPassword from './pages/modificaPassword/modificaPassword';
import SignUp2 from './pages/signUp/signUp2';
import CancellaAccount from './pages/cancellaAccount/cancellaAccount';
require('dotenv').config({ path: '../.env' })

toast.configure()
function App() {
  return (
    <div className="App">

      <AccountProvider>
        <Switch>
          <Route exact path="/cancellaAccount" component={CancellaAccount}/>
          <Route exact path="/secondRegister" component={SignUp2}/>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/modificaPassword" component={ModificaPassword}/>
          <Route exact path="/informazioniPersonaliUtente" component={InformazioniPersonaliUtente}/>
          <Route exact path="/areaPersonaleUtente" component={AreaPersonaleUtente}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={ConnectedLogin}/>
          <Route exact path="/search/:location/:dept" component={ConnectedDoctorList}/>
          <Route exact path="/recovery/:token" component={Recovery}/>
          <Route exact path="/recover" component={ConnectedRecover}/>
          <Route  path="/redirect/:url"  component={SocialLink} />

        </Switch>
      </AccountProvider>
    </div>
  );
}

export default App;
