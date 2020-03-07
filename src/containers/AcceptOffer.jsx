import React from "react";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import "assets/css/AcceptOffer.css";
import RideOffer from "../components/rideOffer/RideOffer";
import "../components/rideOffer/RideOffer.css";
import { NavLink } from "react-router-dom";

function AcceptOffer() {
  return (
    <div className="container-fluid">
      <div className="sticky">
        <RecommendationBanner />
        <NavLink
          className="cancelarButton"
          onClick={() => {
            console.log("Clicked");
          }}
          to="/home"
        >
          Cancelar
        </NavLink>
      </div>
      <div>
        <RideOffer
          nombre="André Corcuera"
          carrera="Ingeniería en Computación"
          año="12"
          parada="Baruta"
          numeroPasajeros="2"
          listaPasajeros="Ángel Morante, Pedro Maldonado"
        />
      </div>
      <div className="aceptarRechazar">
        <NavLink to="/ride">
          <div className="aceptarCola">
            <p>Aceptar</p>
          </div>
        </NavLink>
        <NavLink to="/espere">
          <div className="rechazarCola">
            <p>Rechazar</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default AcceptOffer;
