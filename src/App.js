import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import pagine Utente
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signup"; //signup per css di login
import SignUp2 from './pages/SignUp/signUp2';
import ModificaPassword from "./pages/modificaPassword/modificaPassword";

//import admin area
import AreaAmministratore from './pages/areaAmministratore/areaAmministratore';
import AggiungiStruttura from './pages/aggiungiStruttura/aggiungiStruttura';
import VisualizzaStrutture from './pages/visualizzaStrutture/visualizzaStrutture';
import DettagliStruttura from './pages/dettagliStruttura/dettagliStruttura';
import ListaPrenotazioniStruttura from './pages/listaPrenotazioniStruttura/listaPrenotazioniStruttura';
import ModificaStruttura from './pages/modificaStruttura/modificaStruttura';
import VisualizzaUtentiRegistrati from './pages/visualizzaUtentiRegistrati/visualizzaUtentiRegistrati';
import VisualizzaRichiesteDiTesseramento from './pages/visualizzaRichiesteDiTesseramento/visualizzaRichiesteDiTesseramento';
//Not found page
import NotFound from './pages/paginaNotFound/paginaNotFound';

import './App.css';


require('dotenv').config({ path: '../.env' })

toast.configure()
function App() {
  return (
    <div className="App">
      <Switch>

        <Route exact path="/" component={Login} />
        <Route exact path="/editPassword" component={ModificaPassword} />

        <Route exact path="/adminArea" component={AreaAmministratore} />
        <Route exact path="/addStructure" component={AggiungiStruttura} />
        <Route exact path="/showStructures" component={VisualizzaStrutture} />
        <Route exact path="/structureDetails/:id" component={DettagliStruttura} />
        <Route exact path="/showReservation/:id" component={ListaPrenotazioniStruttura} />
        <Route exact path="/editStructure/:id" component={ModificaStruttura} />
        <Route exact path="/showUsers" component={VisualizzaUtentiRegistrati} />
        <Route exact path="/showMembershipRequests" component={VisualizzaRichiesteDiTesseramento} />

        <Route component={NotFound} />

      </Switch>
    </div>
  );
}

export default App;
