import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import ChangeRideState from "../components/changeRideState/ChangeRideState";
import Passenger from "../components/passenger/Passenger";

class RideProcess extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="sticky">
          <RecommendationBanner />
        </div>
        <div className="listaPasajeros">
          {/*this.state.passengers.map((list) => {
            return list.requests.map((passenger, passengerIndex) => {
              return (
                <Passenger
                  foto={passenger.user.prPic}
                  nombre={passenger.user.fName + " " + passenger.user.lName}
                  carrera={passenger.user.major}
                  cohorte={passenger.user.usbid.split("-")[0]}
                  ruta={list.name}
                  usbid={passenger.user.usbid}
                  comentario={passenger.comment}
                  onClick={() => {
                    this.prueba(passenger.user.usbid, passenger.email);
                  }}
                  key={passengerIndex}
                />
              );
            });
          })*/}
          <Passenger
            nombre="javier vivas"
            carrera="ingeniera"
            cohorte="12"
            ruta="baruta"
            usbid="12-11067"
            comentario="dfghfghghdhfgh"
            colaAceptada="true"
            telefono="02121234567"
          />
        </div>
        <ChangeRideState />
      </div>
    );
  }
}

export default RideProcess;
