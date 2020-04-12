import React, { Component } from "react";
import "assets/css/RideProcess.css";
import "../assets/css/AvailablePassengers.css";
import { getRide, changeStatus } from "services/rideService";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import ChangeRideState from "../components/changeRideState/ChangeRideState";
import Passenger from "../components/passenger/Passenger";

class RideProcess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passengers: this.props.location.state.confirmedPassengers,
      rideStatus: this.props.location.state.rideInfo.data.status,
    };
  }

  prueba = (event) => {
    getRide()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);
      })

      .catch((error) => {
        console.log("Catch", error);
      });
  };

  prueba2 = (event) => {
    console.log("props: ", this.props.location.state);
    console.log(this.state);
  };

  changeStatus = (event) => {
    let status = document.getElementById(event.target.id);

    let newStatus = "";
    if (status.id === "enCamino") {
      newStatus = "En Camino";
    } else if (status.id === "accidentado") {
      newStatus = "Accidentado";
    } else {
      newStatus = "Finalizado";
    }

    const changeStatusBody = {
      rider: this.props.location.state.rideInfo.data.rider,
      passenger: this.props.location.state.rideInfo.data.passenger,
      seats: this.props.location.state.rideInfo.data.available_seats,
      startLocation: this.props.location.state.rideInfo.data.start_location,
      destination: this.props.location.state.rideInfo.data.destination,
      status: newStatus,
    };
    console.log(changeStatusBody);
    changeStatus(changeStatusBody)
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.log("Catch", error);
      });
  };

  render() {
    return (
      <div className="RideProcess">
        <div className="sticky" id="recommendationBanner">
          <button onClick={this.prueba} />
          <button onClick={this.prueba2} />
          <RecommendationBanner />
        </div>
        <div className="Ride">
          <div className="listaPasajeros" id="listaAceptados">
            {this.state.passengers.map((confirmedPassenger) => {
              return (
                <Passenger
                  foto={confirmedPassenger[0]}
                  nombre={confirmedPassenger[1]}
                  cohorte={confirmedPassenger[2]}
                  telefono={confirmedPassenger[3]}
                  carrera={confirmedPassenger[4]}
                  ruta={confirmedPassenger[5]}
                  comentario={confirmedPassenger[6]}
                />
              );
            })}
          </div>
          <div className="stateButtons">
            <div
              className="statusButton"
              id="enCamino"
              onClick={this.changeStatus}
            >
              EN CAMINO
            </div>
            <div
              className="statusButton"
              id="accidentado"
              onClick={this.changeStatus}
            >
              ACCIDENTADO
            </div>
            <div
              className="statusButton"
              id="finalizada"
              onClick={this.changeStatus}
            >
              FINALIZADA
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RideProcess;
