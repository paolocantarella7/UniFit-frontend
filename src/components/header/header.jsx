import React from "react";

import "./header.scss";

import { Link } from "react-router-dom";
import { AccountConsumer } from "../../providers/accountProvider";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLogged: false,
    };
  }
  
  componentDidMount() {
    
    this.setState({ user: localStorage.getItem('currentUser')})
    this.setState({ isLogged: localStorage.getItem('isLogged')})
    
  }
  
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.setItem('isLogged' , false);

    window.location.href = 'http://localhost:3000/'

  };
  checkActive(route) {
    if (this.props.match.path === route) return "active";
  }
  render() {
    return (
      <div className="container-fluid header">
        <nav className="navbar navbar-expand-md navbar-light headerMenus">
         
        {this.state.user.isAdmin === 1
          ?  
          <img src="/img/logo.png" width={"60 px"} alt="" />
         :
          <Link to="/" className="navbar-brand">
          <img src="/img/logo.png" width={"60 px"} alt="" />
        </Link>
        }

          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {this.state.user.isAdmin === 1
            ? <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav ml-auto navItems">
              {this.state.isLogged && this.state.user.isAdmin === 1 ? 
              (
                <li className="nav-item">
                  <Link
                    to={`/adminArea`}
                    className={`nav-link`}
                  >
                    Area amministratore
                  </Link>
                </li>
              ) : (
                ""
              )}
              {this.state.isLogged ? (
                <button className="btn nav-link logout" onClick={this.logout}>
                  Logout
                </button>
              ) : (
                ""
              )}
            </ul>
          </div>
          : this.state.user.isAdmin === 0
            ? <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav ml-auto navItems">
              {this.state.isLogged && this.state.user.isAdmin === 0 ? (
                <li className="nav-item">
                  <Link
                    to={`/prenota`}
                    className={`${this.checkActive("/prenota")} nav-link`}
                  >
                    Prenota
                  </Link>
                </li>
              ) : (
                ""
              )}
              {this.state.isLogged && this.state.user.isAdmin === 0 ? (
                <li className="nav-item">
                  <Link
                    to={`/tesseramento`}
                    className={`${this.checkActive("/tesseramento")} nav-link`}
                  >
                    Tesseramento
                  </Link>
                </li>
              ) : (
                ""
              )}
              {this.state.isLogged && this.state.user.isAdmin === 0 ? (
                <li className="nav-item">
                  <Link
                    to={`/areaPersonaleUtente`}
                    className={`${this.checkActive("/areaUtente")} nav-link`}
                  >
                    Area utente
                  </Link>
                </li>
              ) : (
                ""
              )}
              {this.state.isLogged ? (
                <button className="btn nav-link logout" onClick={this.logout}>
                  Logout
                </button>
              ) : (
                ""
              )}
            </ul>
          </div>
          : this.props.type === 'login'
            ? <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav ml-auto navItems">
              
                <li className="nav-item">
                <Link
                  to={`/signUp`}
                  className={`${this.checkActive("/signup")} nav-link signup`}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          : this.props.type === 'register'
            ? <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav ml-auto navItems">
            <li className="nav-item">
                  <Link
                    to={`/login`}
                    className={`${this.checkActive("/login")} nav-link login`}
                  >
                    Login
                  </Link>
                </li>
            </ul>
          </div>
          : ""}
        </nav>
      </div>
    );
  }
}

// AccountConsumer is a provider that helps to manage state
const ConnectedHeader = (props) => (
  <AccountConsumer>
    {({ updateAccount }) => <Header {...props} updateAccount={updateAccount} />}
  </AccountConsumer>
);
export default ConnectedHeader;
