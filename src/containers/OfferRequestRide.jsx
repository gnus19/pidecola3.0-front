import React, { Component } from "react";
import { infoRide } from "services/userServices";
import "../assets/css/OfferRequestRide.css";
import CardButton from "../components/cardButton/CardButton";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";

class OfferRequestRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      activeRide: false,
      direction: "",
      route: "",
    };
  }

  componentDidMount() {
    infoRide()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        if (response.message !== "No existe") {
          console.log("status: ", response.status);
          this.setState({
            activeRide: true,
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
  }

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

    if (this.state.activeRide) {
      errorMessage =
        errorMessage +
        "No puedes ofrecer la cola si tienes una solicitud de cola activa.";
    }

    if (errorMessage !== "") {
      this.setState({
        error: errorMessage,
      });
    } else {
      this.props.history.push({
        pathname: "/ride",
        state: { pideCola: false },
      });
    }
  };

  checkRideState = (event) => {
    console.log("ridestate: ", this.state);
    if (!this.state.activeRide) {
      console.log("PRUEBA FALSE");
      this.props.history.push({
        pathname: "/ride",
        state: { pideCola: true },
      });
    } else {
      console.log("PRUEBA TRUE");
      this.props.history.push({
        pathname: "/waitOffer",
        state: {
          user: localStorage.getItem("email"),
          direction: this.state.direction,
          route: this.state.route,
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
              onClick={this.checkRideState}
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
