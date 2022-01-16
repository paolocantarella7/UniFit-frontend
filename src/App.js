import React from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import pagine Utente
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signup";
import SignUp2 from "./pages/SignUp/signUp2";
import Recovery from "./components/recovery/Recovery";
import ConnectedRecover from "./pages/recovery/recover";
import HomePage from "./pages/HomePage/homepage";
import AreaPersonaleUtente from "./pages/areaPersonaleUtente/areaPersonaleUtente";
import InformazioniPersonaliUtente from "./pages/informazioniPersonaliUtente/informazioniPersonaliUtente";
import ModificaPassword from "./pages/modificaPassword/modificaPassword";
import CancellaAccount from "./pages/cancellaAccount/cancellaAccount";

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
        <Route exact path="/recover" component={ConnectedRecover} />
        <Route exact path="/recovery/:token" component={Recovery} />
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
