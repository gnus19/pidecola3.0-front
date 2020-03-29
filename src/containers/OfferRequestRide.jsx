import React, { Component } from "react";
import "../assets/css/OfferRequestRide.css";
import CardButton from "../components/cardButton/CardButton";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";

class OfferRequestRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  checkVehicles = event => {
    event.preventDefault();
    if (JSON.parse(localStorage.getItem("vehicleList")).length < 1)
      this.setState({
        error: true
      });
    else {
      return true;
    }
  };

  render() {
    return (
      <div className="OfferRequestRide">
        <React.Fragment>
          <RecommendationBanner />
          {this.state.error && (
            <div className="responseProfileError">
              No puedes ofrecer la cola sin tener al menos un vehículo
              registrado
            </div>
          )}
          <div className="OfferRequest">
            <CardButton
              className="RequestButton"
              path="/ride"
              pideCola={true}
              title="Pedir cola"
              text="Solicita una cola para ir a la universidad o para salir de
              ella"
            />
            <CardButton
              className="OfferButton"
              path="/ride"
              pideCola={false}
              title="Dar cola"
              text="Brinda la ayuda a un compañero, profesor o empleado para ir o salir de la universidad"
            />
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default OfferRequestRide;
