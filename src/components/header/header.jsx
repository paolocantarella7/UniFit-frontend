import React from 'react';
import './header.scss'
import { Link } from 'react-router-dom'
import { AccountConsumer } from '../../providers/accountProvider'
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      country: [],
      departments: []
    }
  }
  /*componentDidMount() {
    window.scrollTo(0, 0);
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/country/`)
      .then(response => response.json())
      .then(data => {
        this.setState({ country: data.country, countCountry: data.count })
      });
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/departments/`)
      .then(response => response.json())
      .then(data => {
        this.setState({ departments: data.departments, deptCount: data.count })
      });

  }*/
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser')
    let { history } = this.props;
    history.push({ pathname: '/' });
    this
      .props
      .updateAccount(false)

  }
  checkActive(route) {
    if (this.props.match.path === route)
      return 'active';
  }
  render() {
    return (<div className="container-fluid header">
      <nav className="navbar navbar-expand-md navbar-light headerMenus">
        <Link to="/" className="navbar-brand"><img src="/img/logo.png" alt="" /></Link>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="nav navbar-nav ml-auto navItems">

            <li className="nav-item">
              <Link to={`/`} className={`${this.checkActive('/')} nav-link`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to={`/aboutus`} className={`${this.checkActive('/aboutus')} nav-link`}>About Us</Link>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-toggle="dropdown">Departments</span>
              <div className="dropdown-menu deptSubMenu">

                {this
                  .state
                  .departments
                  .map((data, index) => (
                    <p
                      value={data.Name}
                      key={index}
                      className="dropdown-item dept"
                      onClick={() => {
                        this
                          .props
                          .history
                          .push(`/search/all/${data.Name}`)
                      }}>{data.Name}</p>
                  ))
                    }
              </div>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-toggle="dropdown">Locations</span>
              <div className="dropdown-menu locationSubMenu">
                {this
                  .state
                  .country
                  .map((data) => (
                    <p
                      value={data.Name}
                      key={data.id}
                      className="dropdown-item loc"
                      onClick={() => {
                        this
                          .props
                          .history
                          .push(`/search/${data.Name}/all`)
                      }}>{data.Name}</p>
                  ))
                }
              </div>
            </li>
            {this.props.currentUser && this.props.currentUser.role === 'doctor'
              ? <li className="nav-item">
                <Link
                  to={`/doctordetail/${this.props.currentUser.id}`}
                  className={`${this.checkActive('/doctordetail/:userid')} nav-link`}>Profile</Link>
              </li>
              : ''
            }
            {this.props.currentUser && this.props.currentUser.role === 'doctor'
              ?
              <button className="btn nav-link logout" onClick={this.logout}>Logout</button>

              : ''}
            {!this.props.currentUser
              ? <li className="nav-item">

                <Link to={`/login`} className={`${this.checkActive('/login')} nav-link login`}>Login</Link>
              </li>
              : ''
            }
            {!this.props.currentUser
              ? <li className="nav-item">
                <Link
                  to={`/signup`}
                  className={`${this.checkActive('/signup')} nav-link signup`}>Signup</Link>
              </li>
              : ''
            }
          </ul>
        </div>
      </nav>
    </div>
    )
  }
}

// AccountConsumer is a provider that helps to manage state
const ConnectedHeader = props => (
  <AccountConsumer>
    {({ currentUser, updateAccount }) => (<Header {...props} currentUser={currentUser} updateAccount={updateAccount} />)}
  </AccountConsumer>
)
export default ConnectedHeader;
