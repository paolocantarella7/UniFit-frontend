import React from "react";
import "./homepage.scss";
import ConnectedHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import WorkingOutSvg from "../../working_out.svg";
import BookingSvg from "../../booking.svg";
import AreaUtenteSvg from "../../areaUtente.svg";
import TesseramentoSvg from "../../tesseramento.svg";
import { Link, Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

// Homepage
class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (localStorage.getItem("isLogged") === "false") {
      return <Redirect to="/" />;
    } else {
      let user = localStorage.getItem("currentUser");
      user = JSON.parse(user);

      if (user.isAdmin === 1) {
        return <Redirect to="/adminArea" />;
      } else {
        return (
          <div className="page">
            <ConnectedHeader {...this.props} />
            <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4">


              <h2 className="py-4 text-cyan">Bentornato su UniFit, {user.nome}!</h2>
              {user.isTesserato === 1 && (
                <h3 className="text-secondary"> Utente Tesserato <FcApproval /> </h3>
              )}

              {user.isTesserato === 0 && (
                <h3 className="text-secondary"> Utente Non Tesserato <FcCancel /> </h3>
              )}

              <img
                className="pt-5 img-fluid"
                width={180}
                src={WorkingOutSvg}
                alt="React Logo"
              />

              <h4 className="font-italic text-secondary mt-4">"Be safe, be fit"</h4>

              <div className="row py-5 align-bottom align-items-end">
                <Card className="mx-auto border-0 py-4" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={BookingSvg} />
                  <Card.Body>
                    <Link to={"/makeReservation"} className={`nav-link`}>
                      <div className="row py-3 px-3">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg mx-auto bg-cyan border"
                          style={{ width: "20rem" }}
                        >
                          Prenota una struttura
                        </button>
                      </div>
                    </Link>
                  </Card.Body>
                </Card>

                {user.isTesserato === 0 && (
                  <Card
                    className="mx-auto border-0 py-4"
                    style={{ width: "18rem" }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ height: "13rem" }}
                      src={TesseramentoSvg}
                    />
                    <Card.Body>
                      <Link to={"/makeMembership"} className={`nav-link`}>
                        <div className="row py-3 px-3">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg mx-auto bg-cyan border"
                            style={{ width: "20rem" }}
                          >
                            Effettua tesseramento
                          </button>
                        </div>
                      </Link>
                    </Card.Body>
                  </Card>
                )}

                <Card className="mx-auto border-0 py-4" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={AreaUtenteSvg} />
                  <Card.Body>
                    <Link to={"/userArea"} className={`nav-link`}>
                      <div className="row py-3 px-3">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg mx-auto bg-cyan border"
                          style={{ width: "20rem" }}
                        >
                          Area personale
                        </button>
                      </div>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <Footer {...this.props} />
          </div>
        );
      }
    }
  }
}

export default HomePage;
