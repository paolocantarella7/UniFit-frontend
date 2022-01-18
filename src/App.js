import React from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import pagine Utente
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signup";
import SignUp2 from "./pages/SignUp/signUp2";
import RegistrazioneEffettuata from "./pages/SignUp/registrazioneEffettuata";
import HomePage from "./pages/HomePage/homepage";
import AreaPersonaleUtente from "./pages/areaPersonaleUtente/areaPersonaleUtente";
import InformazioniPersonaliUtente from "./pages/informazioniPersonaliUtente/informazioniPersonaliUtente";
import ModificaPassword from "./pages/modificaPassword/modificaPassword";
import CancellaAccount from "./pages/cancellaAccount/cancellaAccount";
import Recover2 from "./pages/recovery2/recover2";
import Recover from "./pages/recovery/recover";

import "./App.css";


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
        <Route exact path="/userDetails" component={InformazioniPersonaliUtente} />
        <Route exact path="/editPassword" component={ModificaPassword} />
        <Route exact path="/deleteAccount" component={CancellaAccount} />
      </Switch>
    </div>
  );
}
export default App;
