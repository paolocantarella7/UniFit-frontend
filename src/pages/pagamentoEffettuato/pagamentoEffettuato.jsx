import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import PagamentoEffettuatoSvg from "../../pagamentoEffettuato.svg";

export default function PagamentoEffettuato() {


  return (


    <div class="container h-100">
      <div class="d-flex align-items-center justify-content-center" style={{"height" : "100vh"}}>

        <div className="container-fluid text-dark rounded col-sm-10 col-10 text-center bg-white my-4">

        <img className="my-5" width="200" src={PagamentoEffettuatoSvg}/>
          <h3 className="my-5 text-cyan">Pagamento effettuato!</h3>

          <Link to={"/"} className={'nav-link'}>
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