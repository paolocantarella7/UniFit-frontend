import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CardUtente from "../../components/cardUtente/cardUtente";
import Server from "../../config.json";
import { Redirect } from "react-router-dom";

class VisualizzaUtentiRegistrati extends React.Component {
  state = {
    users: [],
    loading: true,
    searchText: "",
  };
  componentDidMount() {
    this.utentiGet();
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state.searchText);
  };

  utentiGet() {
    var url = Server.API_URL + "admin/utenti/visualizzautenti";
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ users: responseJson.utentiRegistrati }, () => {
          this.setState({ loading: false });
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (localStorage.getItem("isLogged") === "true") {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (!user.isAdmin) {
        return <Redirect to="/home" />;
      }
    }
    return this.state.loading ? (
      <div className="page">
        <ConnectedHeader {...this.props} />

        <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
          <h1 className="pt-4">Caricamento Utenti</h1>
        </div>

        <Footer {...this.props} />
      </div>
    ) : (
      <div className="page">
        <ConnectedHeader {...this.props} />

        <div className="container-fluid text-dark rounded w-75 text-center bg-white my-4">
          <h1 className="pt-4 mb-4 text-cyan">Utenti Registrati</h1>

          <input
            type="text"
            name="searchText"
            placeholder="Cerca utente..."
            className="effect-8 rounded col-xs-12 col-sm-6 mb-4 p-2"
            style={{ border: "2px solid #00c1fc" }}
            value={this.state.searchText}
            onChange={this.handleChange}
          />

          <div className="col">
            {this.state.users.length === 0 ? (
              <p>Non ci sono utenti!</p>
            ) : (
              this.state.users
                .filter(
                  (user) =>
                    user.nome
                      .toLowerCase()
                      .includes(this.state.searchText.toLowerCase()) ||
                    user.cognome
                      .toLowerCase()
                      .includes(this.state.searchText.toLowerCase())
                )
                .map((filteredUser) => (
                  <CardUtente key={filteredUser.id} utente={filteredUser} />
                ))
            )}
          </div>
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default VisualizzaUtentiRegistrati;
