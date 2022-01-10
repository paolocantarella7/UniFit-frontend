import React from "react";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { User } from "../../models/User";

class VisualizzaUtentiRegistrati extends React.Component {
    render() {
        return (
          <div>
            <ConnectedHeader
              {...this.props}
              currentUser={new User("admin", "Luigi")}
              type= "admin"
            />
            visualizzaUtentiRegistrati
            <Footer {...this.props} />
          </div>
        );
      }
}

export default VisualizzaUtentiRegistrati;