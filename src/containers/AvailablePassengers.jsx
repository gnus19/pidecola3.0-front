import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import "../components/passenger/Passenger.css";

class AvailablePassengers extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="sticky">
          <RecommendationBanner />
          {/*<div className="pidecola-message" text="">
          Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
        </div>*/}
          <div className="cartaInfo">
            <p>AVEO-GRIS-AB000WY || HACIA USB || BARUTA</p>
          </div>
          {/*<Button
          className="red"
          text="Cancelar"
          onClick={() => {
            console.log("Clicked");
          }}
        />*/}
          <NavLink className="cancelarButton" to="/home">
            Cancelar
          </NavLink>
        </div>
        <div className="listaPasajeros">
          <Passenger
            nombre="André Corcuera"
            carrera="Ingeniería en Computación"
            cohorte="12"
            ruta="Baruta"
            comentario="Realmente voy a Las Mercedes"
          />
        </div>
      </div>
    );
  }
}

export default AvailablePassengers;
