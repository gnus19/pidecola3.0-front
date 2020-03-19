import React, { Component } from "react";
import "../assets/css/OfferRequestRide.css";
import CardButton from "../components/cardButton/CardButton";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";

class OfferRequestRide extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="OfferRequestRide">
        <React.Fragment>
          <RecommendationBanner />
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
