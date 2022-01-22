import React from "react";
import { Link } from "react-router-dom";
import animationData from "./notFound.json";
import Lottie from "react-lottie";

export default function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container h-100">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4">
          <Lottie options={defaultOptions} height={300} width={300} />
          <h3 className="mb-5 text-cyan">Pagina non esistente!</h3>

          <Link to={"/"} className={`nav-link`}>
            <div className="row py-3 px-3 mb-5">
              <button
                type="button"
                className="btn btn-primary btn-lg mx-auto bg-cyan border col-xs-12 col-md-8"
              >
                Torna alla home
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
