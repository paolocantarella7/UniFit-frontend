import React from "react";

import "./header.scss";

import { Link } from "react-router-dom";
import Server from "../../config.json";

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
    localStorage.setItem("isLogged", false);

    window.location.assign(Server.FRONT_URL);
  };

  checkActive(route) {
    if (this.props.match.path === route) return "active";
  }
  
  render() {
    let user = localStorage.getItem('currentUser')
      user = JSON.parse(user);

  
      
    return localStorage.getItem("isLogged") === "true" ? (
      
     user.isAdmin === 1 ? (
        <div className="container-fluid header">
          <nav className="navbar navbar-expand-md navbar-light headerMenus">
            <img src="/img/logo.png" width={"60 px"} alt="" />
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav ml-auto navItems">
                <li className="nav-item">
                  <Link to={`/adminArea`} className={`nav-link`}>
                    Area amministratore
                  </Link>
                </li>
                <button className="btn nav-link logout" onClick={this.logout}>
                  Logout
                </button>
              </ul>
            </div>
          </nav>
        </div>
      ) : (
        <div className="container-fluid header">
          <nav className="navbar navbar-expand-md navbar-light headerMenus">
            <Link to="/" className="navbar-brand">
              <img src="/img/logo.png" width={"60 px"} alt="" />
            </Link>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav ml-auto navItems">
                <li className="nav-item">
                  <Link
                    to={`/makeReservation`}
                    className={`${this.checkActive("/makeReservation")} nav-link`}
                  >
                    Prenota
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/makeMembership`}
                    className={`${this.checkActive("/makeMembership")} nav-link`}
                  >
                    Tesseramento
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/userArea`}
                    className={`${this.checkActive("/userArea")} nav-link`}
                  >
                    Area utente
                  </Link>
                </li>
                <button className="btn nav-link logout" onClick={this.logout}>
                  Logout
                </button>
              </ul>
            </div>
          </nav>
        </div>
      )
    ) : (
      <div className="container-fluid header">
        <nav className="navbar navbar-expand-md navbar-light headerMenus">
          <img src="/img/logo.png" width={"60 px"} alt="" />
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav ml-auto navItems">
              <li className="nav-item">
                <Link to={`/signup`} className={`nav-link`}>
                  Registrati
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/`} className={`nav-link`}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

// AccountConsumer is a provider that helps to manage state

export default ConnectedHeader;
