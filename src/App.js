import React from 'react';
import {Switch, Route} from 'react-router-dom'
import AccountProvider from './providers/accountProvider'

import HomePage from './pages/HomePage/homepage'
import ConnectedSignUpDoctor from './pages/Signup/signup'
import ConnectedLogin from './pages/Login/login'
import ConnectedDoctorList from './pages/doctorList/doctorList'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
require('dotenv').config({ path: '../.env' })

toast.configure()
function App() {
  return (
    <div className="App">

      <AccountProvider>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/signup" component={ConnectedSignUpDoctor}/>
          <Route exact path="/login" component={ConnectedLogin}/>

        </Switch>
      </AccountProvider>
    </div>
  );
}

export default App;
