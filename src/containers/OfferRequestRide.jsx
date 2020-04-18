import React, { Component } from "react";
import { getRequest } from "services/userServices";
import { getRide } from "services/rideService";
import "../assets/css/OfferRequestRide.css";
import CardButton from "../components/cardButton/CardButton";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";

class OfferRequestRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      activeRequest: false,
      direction: "",
      route: "",
      activeRide: false,
      rideInfo: "",
      rider: "",
      riderInfo: "",
      passenger: "",
    };
  }

  // Solicita si el usuario tiene una solicitud de cola abierta y, de ser así, sus datos
  componentDidMount() {
    getRequest()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        if (response.message !== "No existe") {
          console.log("status: ", response.status);
          this.setState({
            activeRequest: true,
            direction:
              response.data.startLocation === "USB" ? "desde" : "hacia",
            route:
              response.data.destination === "USB"
                ? response.data.startLocation
                : response.data.destination,
          });
        }
      })

      .catch((error) => {
        console.log("Catch: ", error);
      });

    getRide()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        if (response.data !== "Cola no existe") {
          let rideInfo = {
            data: response.data.ride,
          };

          this.setState({
            activeRide: true,
            rideInfo: rideInfo,
            rider: response.data.ride.rider,
            riderInfo: response.data.riderInfo,
            passenger: response.data.ride.passenger,
          });
        }
      })

      .catch((error) => {
        console.log("Catch: ", error);
      });
  }

  // Verifica si el usuario tiene al menos un vehículo registrado para dar la cola y si no tiene una solicitud de cola activa
  checkOffer = (event) => {
    // event.preventDefault();

    let errorMessage = "";

    if (
      !localStorage.getItem("vehicleList") ||
      JSON.parse(localStorage.getItem("vehicleList")).length < 1
    ) {
      errorMessage =
        errorMessage +
        "No puedes ofrecer la cola sin tener al menos un vehículo registrado. ";
    }

    if (this.state.activeRequest) {
      errorMessage =
        errorMessage +
        "No puedes ofrecer la cola si tienes una solicitud de cola activa. ";
    }

    if (
      this.state.activeRide &&
      this.state.rider !== localStorage.getItem("email")
    ) {
      errorMessage =
        errorMessage +
        "No puedes ofrecer la cola si eres pasajero en una cola activa.";
    }

    if (errorMessage !== "") {
      this.setState({
        error: errorMessage,
      });
      return;
    }

    if (
      this.state.activeRide &&
      this.state.rider === localStorage.getItem("email")
    ) {
      this.props.history.push({
        pathname: "/rideProcess",
        state: {
          rideInfo: this.state.rideInfo,
          confirmedPassengers: this.state.passenger,
        },
      });
    }

    if (!this.state.activeRequest && !this.state.activeRide) {
      this.props.history.push({
        pathname: "/ride",
        state: { pideCola: false },
      });
    }
  };

  // En caso de tener una solicitud de cola activa, el usuario es redirigido a la vista de Espera. En caso contrario, es redirigido a la vista de Pedir cola
  checkRequest = (event) => {
    console.log("ridestate: ", this.state);

    let errorMessage = "";

    if (
      this.state.activeRide &&
      this.state.rider === localStorage.getItem("email")
    ) {
      errorMessage =
        errorMessage +
        "No puedes pedir la cola si tienes una cola activa como conductor. ";
    }

    if (errorMessage !== "") {
      this.setState({
        error: errorMessage,
      });
      return;
    }

    if (!this.state.activeRequest && !this.state.activeRide) {
      console.log("prueba 1");
      this.props.history.push({
        pathname: "/ride",
        state: { pideCola: true },
      });
    }

    if (this.state.activeRequest && !this.state.activeRide) {
      this.props.history.push({
        pathname: "/waitOffer",
      });
    }

    if (
      this.state.activeRide &&
      this.state.rider !== localStorage.getItem("email")
    ) {
      let data = {
        email: this.state.rider,
        first_name: this.state.riderInfo.fname,
        last_name: this.state.riderInfo.lname,
        age: this.state.riderInfo.age,
        major: this.state.riderInfo.major,
        phone_number: this.state.riderInfo.phone,
        profile_pic: this.state.riderInfo.photo,
        car: this.state.riderInfo.vehicle[0].vehicles,
        route:
          this.state.rideInfo.data.start_location === "USB"
            ? this.state.rideInfo.data.destination
            : this.state.rideInfo.data.start_location,
      };

      let riderInfo = {
        activeRide: true,
        data: data,
        direction:
          this.state.rideInfo.data.destination === "USB" ? "hacia" : "desde",
        route:
          this.state.rideInfo.data.start_location === "USB"
            ? this.state.rideInfo.data.destination
            : this.state.rideInfo.data.start_location,
      };

      this.props.history.push({
        pathname: "/waitOffer",
        state: {
          riderInfo: riderInfo,
          activeRide: true,
          rideStatus: this.state.rideInfo.data.status,
        },
      });
    }
  };

  render() {
    return (
      <div className="OfferRequestRide">
        <React.Fragment>
          <RecommendationBanner />
          {this.state.error && (
            <div className="responseProfileError">{this.state.error}</div>
          )}
          <div className="OfferRequest">
            <CardButton
              className="RequestButton"
              title="Pedir cola"
              text="Solicita una cola para ir a la universidad o para salir de
              ella"
              onClick={this.checkRequest}
            />
            <CardButton
              className="OfferButton"
              title="Dar cola"
              text="Brinda la ayuda a un compañero, profesor o empleado para ir o salir de la universidad"
              onClick={this.checkOffer}
            />
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default OfferRequestRide;
