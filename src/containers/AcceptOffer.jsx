import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "assets/css/AcceptOffer.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import RideInfo from "../components/rideInfo/RideInfo";
import "../components/rideInfo/RideInfo.css";
import VehicleInfo from "../components/vehicleInfo/VehicleInfo";
import "../components/vehicleInfo/VehicleInfo.css";

class AcceptOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false
    };
  }

  changeState = () => {
    this.setState({
      accepted: true
    });
  };

  render() {
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
        <React.Fragment>
          <RideInfo
            nombre="André Corcuera"
            cohorte="12"
            carrera="Ingeniería en Computación"
            ruta="Baruta"
            numeroPasajeros="2"
            pasajeros="Ángel Morante, Pedro Maldonado"
          />
        </React.Fragment>
        {!this.state.accepted && (
          <div className="aceptarRechazar">
            <div className="aceptarCola" onClick={this.changeState}>
              <p>Aceptar</p>
            </div>
            <div className="rechazarCola">
              <NavLink to="/waitOffer">
                <p>Rechazar</p>
              </NavLink>
            </div>
          </div>
        )}
        {this.state.accepted && (
          <React.Fragment>
            <VehicleInfo
              marca="Toyota"
              modelo="Corolla"
              color="Rojo"
              placa="XXX-XXX"
            ></VehicleInfo>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default AcceptOffer;
