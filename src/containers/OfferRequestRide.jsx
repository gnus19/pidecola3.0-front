import React, { Component } from "react";
import "../assets/css/OfferRequestRide.css";
import CardButton from "../components/cardButton/CardButton";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";

class OfferRequestRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorMessage:
        "No puedes ofrecer la cola sin tener al menos un vehículo registrado"
    };
  }

  checkVehicles = event => {
    event.preventDefault();
    if (!localStorage.getItem("vehicleList") || JSON.parse(localStorage.getItem("vehicleList")).length < 1) {
      this.setState({
        error: true
      });
    }
    else {
      this.props.history.push({
        pathname: '/ride',
        state: { pideCola: false }
      })
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
              onClick={this.checkVehicles}
            />
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default OfferRequestRide;
