import React from "react";

import "./header.scss";

import { Redirect, Link } from 'react-router-dom';
import { AccountConsumer } from "../../providers/accountProvider";

class ConnectedHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      //user: {},
    };
  }
  
  componentDidMount() {
    
   // this.setState({ user: localStorage.getItem('currentUser')})
    //this.setState({ isLogged: localStorage.getItem('isLogged')})

    //console.log(this.state.user)
    //console.log(this.state.isLoggedz)
    
  }
  
  logout = (e) => {
    e.preventDefault();
 
    localStorage.removeItem("currentUser");
    localStorage.setItem('isLogged' , false);
   
    window.location.assign("http://localhost:3000/") 

  };
  checkActive(route) {
    if (this.props.match.path === route) return "active";
  }
  render() {
    return (

        (localStorage.getItem('isLogged') === 'true') ?

        <button className="btn nav-link logout" onClick={this.logout}>
          Logout
        </button>
      
      :

      <button>non sei loggato</button>

    );
  }
}

// AccountConsumer is a provider that helps to manage state

export default ConnectedHeader;
