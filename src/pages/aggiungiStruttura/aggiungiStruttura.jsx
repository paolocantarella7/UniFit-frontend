import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";

class AggiungiStruttura extends React.Component {
    render() {
        return (
          <div>
            <ConnectedHeader
              {...this.props}
              currentUser={new User("admin", "Luigi")}
              type= "admin"
            />
            aggiungiStruttura
            <Footer {...this.props} />
          </div>
        );
      }
}

export default AggiungiStruttura;