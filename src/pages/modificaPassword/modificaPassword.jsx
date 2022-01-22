import React from "react";
import Footer from "../../components/footer/footer";
import ConnectedHeader from "../../components/header/header";
import Server from "../../config.json";
import { toast } from "react-toastify";
class ModificaPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirmPassword: "",
      loading: false,
      errors: {},
    };
  }
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLogged", false);
    window.location.assign(Server.FRONT_URL);
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  formSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!this.state.password) errors.password = "Inserire la nuova password";
    if (!this.state.confirmPassword)
      errors.confirmPassword = "Inserire la conferma della password";
    if (errors.password || errors.confirmPassword) {
      this.setState({ errors });
      return;
    } else {
      var data = new FormData();
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);
      console.log(this.state.password);
      console.log(this.state.confirmPassword);
      data.append("idUtente", user.idUtente);
      data.append("password", this.state.password);
      data.append("passwordConferma", this.state.confirmPassword);
    }
    this.setState({ loading: true });
    var url = Server.API_URL + "user/modificaPassword";
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false });
        console.log(responseJson);
        if (responseJson.code === 200){
          toast.success(responseJson.msg , {
            autoClose: 8000,
            className: "success"
          })
          localStorage.removeItem("currentUser");
          localStorage.setItem("isLogged", false);
          window.location.assign(Server.FRONT_URL);
        } else {
          responseJson.error.map(error => {
              toast.error(
                  error.msg,
                  {
                      autoClose: 8000,
                      className: "errorToast"
                  }
              )
          })
        }
      })
  };

  render() {
    return (
      <div>
        <ConnectedHeader {...this.props} />
        <form className="container-fluid text-dark rounded col-10 col-md-6 text-center bg-white my-4 py-4">
          <h1 className="pt-4">Modifica password</h1>
          <div class="form-group py-2">
            <input
              name="password"
              type="password"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Inserisci la nuova password..."
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group py-2">
            <input
              name="confirmPassword"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Conferma la nuova password..."
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="button"
            class="btn btn-primary bg-cyan border col-6 rounded"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            SALVA
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Avvertenza
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Annulla"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Sei sicuro di voler modificare la tua password?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={this.formSubmit}
                    type="button"
                    class="btn btn-primary"
                  >
                    Conferma
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Footer {...this.props} />
      </div>
    );
  }
}
export default ModificaPassword;
