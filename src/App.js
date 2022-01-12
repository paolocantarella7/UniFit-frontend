import React from 'react';
import {Switch, Route} from 'react-router-dom'
import AccountProvider from './providers/accountProvider'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InformazioniPersonaliUtente from './pages/informazioniPersonaliUtente/informazioniPersonaliUtente'
import AreaPersonaleUtente from './pages/areaPersonaleUtente/areaPersonaleUtente'
import HomePage from './pages/HomePage/homepage'
import SignUp from './pages/SignUp/signUp'
import ConnectedLogin from './pages/Login/login'
import ConnectedDoctorList from './pages/doctorList/doctorList'
import Recovery from './components/recovery/Recovery';
import ConnectedRecover from './pages/recovery/recover'; 
import SocialLink from './components/social_link/Sociallink';
import ModificaPassword from './pages/modificaPassword/modificaPassword';
import SignUp2 from './pages/SignUp/signUp2';
import CancellaAccount from './pages/cancellaAccount/cancellaAccount';
import AreaAmministratore from './pages/areaAmministratore/areaAmministratore';
import AggiungiStruttura from './pages/aggiungiStruttura/aggiungiStruttura';
import VisualizzaStrutture from './pages/visualizzaStrutture/visualizzaStrutture';
import DettagliStruttura from './pages/dettagliStruttura/dettagliStruttura';
import ModificaStruttura from './pages/modificaStruttura/modificaStruttura';
import VisualizzaUtentiRegistrati from './pages/visualizzaUtentiRegistrati/visualizzaUtentiRegistrati';
import VisualizzaRichiesteDiTesseramento from './pages/visualizzaRichiesteDiTesseramento/visualizzaRichiesteDiTesseramento';

import './App.css';

require('dotenv').config({ path: '../.env' })

toast.configure()
function App() {
  return (
    <div className="App">

      <AccountProvider>
        <Switch>
          <Route exact path="/adminArea" component={AreaAmministratore}/>
          <Route exact path="/addStructure" component={AggiungiStruttura}/>
          <Route exact path="/showStructures" component={VisualizzaStrutture}/>
          <Route exact path="/structureDetails/:id" component={DettagliStruttura}/>
          <Route exact path="/editStructure/:id" component={ModificaStruttura}/>
          <Route exact path="/showUsers" component={VisualizzaUtentiRegistrati}/>
          <Route exact path="/showMembershipRequests" component={VisualizzaRichiesteDiTesseramento}/>
          <Route exact path="/deleteAccount" component={CancellaAccount}/>
          <Route exact path="/secondRegister" component={SignUp2}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/editPassword" component={ModificaPassword}/>
          <Route exact path="/userDetails" component={InformazioniPersonaliUtente}/>
          <Route exact path="/userArea" component={AreaPersonaleUtente}/>
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
