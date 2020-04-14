import React, { Component } from "react";
import "assets/css/RideProcess.css";
import "../assets/css/AvailablePassengers.css";
import { changeStatus, endRide } from "services/rideService";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";

class RideProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passengers: this.props.location.state.confirmedPassengers,
      rideStatus: this.props.location.state.rideInfo.data.status,
    };
  }

  changeStatus = (event) => {
    let status = document.getElementById(event.target.id);
    let newStatus = "";
    if (status.id === "enCamino") {
      newStatus = "En Camino";
      this.setState({
        rideStatus: "En Camino",
      });
    } else if (status.id === "accidentado") {
      newStatus = "Accidentado";
      this.setState({
        rideStatus: "Accidentado",
      });
    } else {
      const endRideBody = {
        rider: this.props.location.state.rideInfo.data.rider,
        passenger: this.props.location.state.rideInfo.data.passenger,
        seats: this.props.location.state.rideInfo.data.available_seats,
        startLocation: this.props.location.state.rideInfo.data.start_location,
        destination: this.props.location.state.rideInfo.data.destination,
      };

      endRide(endRideBody)
        .then((res) => res.json())
        .then((response) => {
          console.log("Response endRide: ", response);
        })
        .catch((error) => {
          console.log("Catch", error);
        });

      newStatus = "Finalizado";
      this.setState({
        rideStatus: "Finalizado",
      });
    }

    const changeStatusBody = {
      rider: this.props.location.state.rideInfo.data.rider,
      passenger: this.props.location.state.rideInfo.data.passenger,
      seats: this.props.location.state.rideInfo.data.available_seats,
      startLocation: this.props.location.state.rideInfo.data.start_location,
      destination: this.props.location.state.rideInfo.data.destination,
      status: newStatus,
    };

    changeStatus(changeStatusBody)
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.log("Catch", error);
      });
  };

  endRide = (event) => {
    const endRideBody = {
      rider: this.props.location.state.rideInfo.data.rider,
      passenger: this.props.location.state.rideInfo.data.passenger,
      seats: this.props.location.state.rideInfo.data.available_seats,
      startLocation: this.props.location.state.rideInfo.data.start_location,
      destination: this.props.location.state.rideInfo.data.destination,
    };

    endRide(endRideBody)
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
