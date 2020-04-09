import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "assets/css/AcceptOffer.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import RideInfo from "../components/rideInfo/RideInfo";
import "../components/rideInfo/RideInfo.css";
import VehicleInfo from "../components/vehicleInfo/VehicleInfo";
import "../components/vehicleInfo/VehicleInfo.css";
import ChangeRideState from "../components/changeRideState/ChangeRideState";
import "../components/changeRideState/ChangeRideState.css";

class AcceptOffer extends Component {
  constructor(props) {
    super(props);
    console.log(props.rider);

    this.state = {
      accepted: false,
    };
  }

  changeState = () => {
    this.setState({
      accepted: true,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        {/*<div className="sticky">
          <RecommendationBanner />
          <div className="cancelarCola" onClick={this.cancelRideRequest}>
            <NavLink to="/home">
              <p>Cancelar</p>
    </NavLink>
          </div>
        </div>*/}
        <React.Fragment>
          <RideInfo
            foto={this.props.rider.profile_pic}
            nombre={`${this.props.rider.first_name} ${this.props.rider.last_name}`}
            cohorte={this.props.rider.email.split("-")[0]}
            carrera={this.props.rider.major}
            ruta="Baruta"
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
            <ChangeRideState />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default AcceptOffer;
