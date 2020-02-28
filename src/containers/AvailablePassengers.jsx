import React from "react";
import Button from "../components/button/Button";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import { NavLink } from "react-router-dom";

function AvailablePassengers() {
  return (
    <div className="container-fluid">
      <div className="sticky">
        <RecommendationBanner />
        {/*<div className="pidecola-message" text="">
          Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
        </div>*/}
        <div className="carta">
          <p>
            AVEO-GRIS-AB000WY || HACIA USB || BARUTA
          </p>
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
      </div>
      <div className="listaPasajeros">
        <Passenger
          nombre="André Corcuera"
          carrera="Ingeniería en Computación"
          año="12"
          parada="Baruta"
          inputComentario="Realmente voy a Las Mercedes"
        />
        {/*<div className="carta grid-container">
          <div className="carnet">12-12345</div>
          <div className="foto"></div>
          <div className="nombre">
            Andre Corcuera <br /> Ing. computacion{" "}
          </div>
          <div className="ruta">
            Baruta-chacaito <br /> Me dirijo: Rosal{" "}
          </div>
          <div className="comentario">Comentario</div>
        </div>
        <div className="carta grid-container">
        <div className="carnet">12-12345</div>
        <div className="foto"></div>
        <div className="nombre">
          Andre Corcuera <br /> Ing. computacion{" "}
        </div>
        <div className="ruta">
          Baruta-chacaito <br /> Me dirijo: Rosal{" "}
        </div>
        <div className="comentario">Comentario</div>
      </div>
      <div className="carta grid-container">
        <div className="carnet">12-12345</div>
        <div className="foto"></div>
        <div className="nombre">
          Andre Corcuera <br /> Ing. computacion{" "}
        </div>
        <div className="ruta">
          Baruta-chacaito <br /> Me dirijo: Rosal{" "}
        </div>
        <div className="comentario">Comentario</div>
        </div>*/}
      </div>
    </div>
  );
}

export default AvailablePassengers;
