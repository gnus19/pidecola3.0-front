import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getWaitingList } from "services/requestRideService";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import "../components/passenger/Passenger.css";
import io from 'socket.io-client';
const socket  = io(global.SERVER);
class AvailablePassengers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passengers: []
    };
  }

  componentDidMount() {

    if (socket && !socket.connected) socket.connect();
    socket.on('connect', () => console.log('connected Scoket'))
    socket.on('reconnecting', times => console.log('Reconnecting' + times))
    socket.on('disconnect', reason => console.log('Reconnecting' + reason))

    socket.emit('offer', {email: localStorage.getItem('email')})

    socket.on('passengers', msg => {
      console.log('Passenger from socket: ',msg)
    })

    console.log(
      `${this.props.location.state.direction} - ${this.props.location.state.route}`
    );
    getWaitingList({ destination: this.props.location.state.route })
      .then(res => res.json())
      .then(response => {
        console.log("Response", response);
        this.setState({ passengers: response.data });
      });
  }

  passengers = list => {};

  prueba = () => {};

  render() {
    return (
      <div className="container-fluid">
        <div className="sticky">
          <RecommendationBanner />
          {/*<div className="pidecola-message" text="">
          Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
        </div>*/}
          <div className="cartaInfo">
            <p>{`${
              this.props.location.state.vehicle
            } || ${this.props.location.state.direction.toUpperCase()} USB || ${this.props.location.state.route.toUpperCase()}`}</p>
          </div>
          <div className="cancelarButton">
            <NavLink to="/home">
              <p>Cancelar</p>
            </NavLink>
          </div>
        </div>
        <div className="listaPasajeros">
          {this.state.passengers.map((list, index) => {
            let routeName = list.name;
            return list.requests.map((passenger, passengerIndex) => {
              return (
                <Passenger
                  nombre={passenger.user.fName + " " + passenger.user.lName}
                  carrera={passenger.user.major}
                  cohorte={passenger.user.usbid.split("-")[0]}
                  ruta={list.name}
                  comentario={passenger.comment}
                  onClick={this.prueba}
                />
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default AvailablePassengers;
