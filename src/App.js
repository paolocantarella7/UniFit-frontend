import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import pagine Utente
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signup";
import SignUp2 from "./pages/SignUp/signUp2";
import RegistrazioneEffettuata from "./pages/SignUp/registrazioneEffettuata";
import Recover from "./pages/recovery/recover";
import Recover2 from "./pages/recovery/recover2";
import HomePage from "./pages/HomePage/homepage";
import AreaPersonaleUtente from "./pages/areaPersonaleUtente/areaPersonaleUtente";
import InformazioniPersonaliUtente from "./pages/informazioniPersonaliUtente/informazioniPersonaliUtente";
import ModificaPassword from "./pages/modificaPassword/modificaPassword";
import CancellaAccount from "./pages/cancellaAccount/cancellaAccount";

//import pagine PRN
import EffettuaPrenotazione from './pages/effettuaPrenotazione/effettuaPrenotazione';
import EffettuaTesseramento from './pages/effettuaTesseramento/effettuaTesseramento';
import Pagamento from './pages/pagamento/pagamento';
import PagamentoEffettuato from './pages/pagamentoEffettuato/pagamentoEffettuato';
import TesseramentoEffettuato from './pages/richiestaTesseramentoInoltrata/richiestaTesseramentoInoltrata';
import VisualizzaPrenotazioni from './pages/miePrenotazioni/miePrenotazioni';
import ModificaPrenotazione from './pages/modificaPrenotazione/modificaPrenotazione';

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


require("dotenv").config({ path: "../.env" });
toast.configure();
function App() {
  return (
    <div className="App">
<Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/secondRegister" component={SignUp2} />
        <Route exact path="/registerDone" component={RegistrazioneEffettuata} />
        <Route exact path="/recover" component={Recover} />
        <Route exact path="/recovery/:token" component={Recover2} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/userArea" component={AreaPersonaleUtente} />
        <Route exact path="/userDetails"component={InformazioniPersonaliUtente}/>
        <Route exact path="/editPassword" component={ModificaPassword} />
        <Route exact path="/deleteAccount" component={CancellaAccount}/>

        <Route exact path="/makeReservation" component={EffettuaPrenotazione} />
        <Route exact path="/makeMembership" component={EffettuaTesseramento} />
        <Route exact path="/makePayment" component={Pagamento} />
        <Route exact path="/paymentDone" component={PagamentoEffettuato} />
        <Route exact path="/doneMembership" component={TesseramentoEffettuato} />
        <Route exact path="/viewReservations" component={VisualizzaPrenotazioni} />
        <Route exact path="/editReservation/:id" component={ModificaPrenotazione} />

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
