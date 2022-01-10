import React from "react";
import "./homepage.scss";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./homepage.scss";
import { User } from "../../models/User";

// Homepage
class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <ConnectedHeader
          {...this.props}
          currentUser={new User("user", "Luigi")}
          type="login"
        />
        <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4">
          <h3 className="py-4 text-cyan">Bentornato su UniFit!</h3>
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default HomePage;
