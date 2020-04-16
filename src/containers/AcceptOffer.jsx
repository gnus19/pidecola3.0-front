import React, { Component } from "react";
import "assets/css/AcceptOffer.css";
import RideInfo from "../components/rideInfo/RideInfo";
import "../components/rideInfo/RideInfo.css";
import VehicleInfo from "../components/vehicleInfo/VehicleInfo";
import RideProgressCard from "../components/rideProgressCard/rideProgressCard";
import "../components/vehicleInfo/VehicleInfo.css";
import "../components/changeRideState/ChangeRideState.css";
import { respondOfferRide } from "../services/requestRideService";
// Sockets
import io from "socket.io-client";
import global from "../global";

class AcceptOffer extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.socket = io(global.SERVER);

    this.state = {
      accepted: false,
      rejectLabel: "Rechazar",
      rideStatus: "esperando",
    };
  }

  componentDidMount() {
    this.socket.on("connect", () => console.log("connected Scoket"));
    this.socket.on("reconnecting", (times) =>
      console.log("Reconnecting " + times)
    );
    this.socket.on("disconnect", (reason) =>
      console.log("Reconnecting " + reason)
    );

    this.socket.emit("offer", { email: localStorage.getItem("email") });

    this.socket.on("rideStatusChanged", (msg) => {
      console.log("rideStatusChanged", msg);
      this.setState({ rideStatus: msg.data.status });
      // Send passenger to review page
      if (msg.data.status === "Finalizado") {
        this.props.history.push({
          pathname: "/rateRide",
          state: {
            rider: this.props.rider,
            startLocation: msg.data.start_location,
            destination: msg.data.destination,
          },
        });
      }
    });
  }

  changeState = (accept) => {
    if (accept === "No") {
      this.setState({ rejectLabel: "Rechazando..." });
    } else {
      this.setState({
        accepted: true,
      });
    }
    // Respond offer to rider
    let requestBody = {
      rider: this.props.rider.email,
      passenger: localStorage.getItem("email"),
      accept: accept,
    };
    respondOfferRide(requestBody)
      .then((res) => {
        res.json();
      })
      .then((response) => {
        console.log("respond offer: ", response);
        // IR a la pantalla de cola
        if (accept === "No") {
          this.props.rejectRider();
        }
      })
      .catch((error) => {
        console.log("Error sending offer anwser", error);
      });
  };

  render() {
    return (
      <div className="container-fluid" id="containerFluidAccept">
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
            telefono={this.props.rider.phone_number}
            cohorte={this.props.rider.email.split("-")[0]}
            carrera={this.props.rider.major}
            ruta={this.props.rider.route}
          />
        </React.Fragment>
        {!this.state.accepted && (
          <div className="aceptarRechazar">
            <div className="aceptarCola" onClick={() => this.changeState("Sí")}>
              <p>Aceptar</p>
            </div>
            <div
              className="rechazarCola"
              onClick={() => this.changeState("No")}
            >
              <p>{this.state.rejectLabel}</p>
            </div>
          </div>
        )}
        {this.state.accepted && (
          <React.Fragment>
            <VehicleInfo
              foto={this.props.rider.car.vehicle_pic}
              marca={this.props.rider.car.brand}
              modelo={this.props.rider.car.model}
              color={this.props.rider.car.color}
              placa={this.props.rider.car.plate}
            ></VehicleInfo>
          </React.Fragment>
        )}
        {this.state.accepted && (
          <RideProgressCard rideState={this.state.rideStatus} />
        )}
      </div>
    );
  }
}

export default AcceptOffer;
