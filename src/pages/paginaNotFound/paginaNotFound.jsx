import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="h-100 w-100 d-inline-block ">
    <h1>404 - Not Found!</h1>

    <div className="col-md-4">
      <img alt="Pagina non trovata" src="img/404nf.jpg"></img>
    </div>

    <div className="col-md-4">
      <Link to="/adminArea">Go to your pages!</Link>
    </div>
  </div>
);

export default NotFound;
