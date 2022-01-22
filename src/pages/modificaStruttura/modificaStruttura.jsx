import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Server from "../../config.json";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import FormModifica from "../../components/formStruttura/formModifica";
class ModificaStruttura extends React.Component {
  state = {
    structure: {},
    form: [],
    loading: true,
    errors: [],
  };

  componentDidMount() {
    this.strutturaGet();
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validate = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "nome":
        errors.nome = value.length <= 0 ? "nome non valido" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  strutturaGet() {
    var url =
      Server.API_URL +
      `admin/strutture/dettagliStruttura/${this.props.match.params.id}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var tempDate = [];

        responseJson.struttura.giorniChiusura.map((obj) => {
          tempDate.push(obj.dataChiusura);
          return null;
        });
        responseJson.struttura.giorniChiusura = tempDate;
        this.setState({ structure: responseJson.struttura }, () => {
          this.setState({ loading: false });
        });
      })

      .catch((error) => console.log(error));
  }

  ModificaStruttura(form) {
    console.log("pagina", form);

    var data = new FormData();

    data.append("nome", form.nome);
    data.append("prezzoPerFascia", form.prezzoPerFascia);
    data.append("dataInizioDisponibilita", form.dataInizioDisponibilita);
    data.append("capacitaPerFascia", form.capacitaPerFascia);
    data.append("oraInizioMattina", form.oraInizioMattina);
    data.append("oraFineMattina", form.oraFineMattina);
    data.append("oraInizioPomeriggio", form.oraInizioPomeriggio);
    data.append("oraFinePomeriggio", form.oraFinePomeriggio);
    data.append("durataPerFascia", form.durataPerFascia);
    data.append("idStruttura", form.idStruttura);

    console.log("pagina", form.giorniChiusura);
    if (form.giorniChiusura.length === 0) {
      data.append("dateChiusura", JSON.stringify({ dateChiusura: [] }));
      console.log("PAGE senza date");
    } else {
      console.log("DATE in JSON " + JSON.stringify(form.giorniChiusura));
      data.append(
        "dateChiusura",
        JSON.stringify({ dateChiusura: form.giorniChiusura })
      );
    }

    console.log(data);
    var url = Server.API_URL + "admin/strutture/modificastruttura";

    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.code === 200) {
          toast.success(responseJson.msg, {
            autoClose: 8000,
            className: "success",
          });
        } else if (responseJson.code === 400) {
          responseJson.error.map((error) => {
            toast.error(error.msg, {
              autoClose: 8000,
              className: "errorToast",
            });
            return null;
          });
        }

        this.setState({ loading: false });
      });
  }

  render() {
    if (localStorage.getItem("isLogged") === "true") {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin !== 1) {
        return <Redirect to="/home" />;
      }
    }
    return (
      <>
        <div className="page">
          <ConnectedHeader {...this.props} />

          <div className="container-fluid text-dark rounded col-10 col-sm-10 col-lg-7 col-xl-6 text-center bg-white my-4 py-4">
            <h1 className="pt-4 text-cyan mb-4">Modifica Struttura</h1>

            {!this.state.loading && (
              <FormModifica
                //date={this.state.array}
                onSubmit={(form) => this.ModificaStruttura(form)}
                struttura={this.state.structure}
              />
            )}
          </div>

          <Footer {...this.props} />
        </div>
      </>
    );
  }
}

export default ModificaStruttura;
