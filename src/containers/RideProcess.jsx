import React, { Component } from "react";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import ChangeRideState from "../components/changeRideState/ChangeRideState";
import Passenger from "../components/passenger/Passenger";

class RideProcess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passengers: this.props.location.state.confirmedPassengers,
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="sticky">
          <RecommendationBanner />
        </div>
        <div className="listaPasajeros">
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
        <ChangeRideState />
      </div>
    );
  }
}

export default RideProcess;
