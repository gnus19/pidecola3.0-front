import React, { Component } from "react";

class ChangeRideState extends Component {
  render() {
    return (
      <div className="stateButtons">
        <div className="enCamino">
          <p>EN CAMINO</p>
        </div>
        <div className="accidentado">
          <p>ACCIDENTADO</p>
        </div>
        <div className="finalizada">
          <p>FINALIZADA</p>
        </div>
      </div>
    );
  }
}

export default ChangeRideState;
