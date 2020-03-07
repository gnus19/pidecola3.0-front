import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";

function WaitOffer() {
  return (
    <div className="container-fluid">
      <div className="sticky">
        <RecommendationBanner />
        {/*<div className="pidecola-message" text="">
          Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
        </div>*/}
        <div className="cartaInfo">
          <p>HACIA USB || BARUTA</p>
        </div>
        {/*<Button
          className="red"
          text="Cancelar"
          onClick={() => {
            console.log("Clicked");
          }}
        />*/}
        <NavLink
          className="cancelarButton"
          onClick={() => {
            console.log("Clicked");
          }}
          to="/home"
        >
          Cancelar
        </NavLink>
        <div style={{ margin: "100px" }}>
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            Espere ...
          </span>
        </div>
      </div>
    </div>
  );
}

export default WaitOffer;
