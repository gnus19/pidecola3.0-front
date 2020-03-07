import React from "react";
import Button from "../components/button/Button";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import { NavLink } from "react-router-dom";

function WaitOffer(props) {
  
  return (
    <div className="container-fluid">
      <div className="sticky">
        <RecommendationBanner />
        {/*<div className="pidecola-message" text="">
          Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
        </div>*/}
        <div className="cartaInfo">
          <p>{`${props.location.state.direction.toUpperCase()} USB || ${props.location.state.route.toUpperCase()}`}</p>
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
