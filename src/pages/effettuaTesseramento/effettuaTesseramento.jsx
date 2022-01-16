import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Redirect } from "react-router-dom";
import Loading from "../../components/loading/loading";

// Login page
class EffettuaTesseramento extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      pass: "",
      errors: {},
      loading: false,
      user: {},
    };
  }

  render() {
    if (localStorage.getItem("isLogged") === "false") {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin) {
        return <Redirect to="/adminArea" />;
      } else {
        return <Redirect to="/home" />;
      }
    } else {
      return (
        <div>
          <ConnectedHeader {...this.props} />
          <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4">
            <h3 className="py-4 text-cyan">Effettua tesseramento</h3>
          </div>
          <Footer {...this.props} />
        </div>
      );
    }
  }
}

export default EffettuaTesseramento;
