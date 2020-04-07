import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getWaitingList } from "services/requestRideService";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import "../components/passenger/Passenger.css";
import io from 'socket.io-client';
import global from '../global';
class AvailablePassengers extends Component {
  constructor(props) {
    super(props);

    this.socket = io(global.SERVER);
    this.state = {
      passengers: []
    };
  }

  componentDidMount() {
    
    this.socket.on('connect', () => console.log('connected Scoket'))
    this.socket.on('reconnecting', times => console.log('Reconnecting ' + times))
    this.socket.on('disconnect', reason => console.log('Reconnecting ' + reason))

    this.socket.emit('offer', {email: localStorage.getItem('email')})

    this.socket.on('passengers', msg => {
      console.log('Passenger from socket: ',msg)
      console.log(this.state)
      if(msg.status) this.setState({ passengers: msg.data })
      console.log(this.state)
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
          {/* <button onClick={() => { this.socket.emit('offer', {email: localStorage.getItem('email')}) ; console.log("Emited");}}>Emit</button> */}
          <div className="cancelarButton">
            <NavLink to="/home">
              <p>Cancelar</p>
            </NavLink>
          </div>
        </div>
        <div className="listaPasajeros">
          {this.state.passengers.map( list => {
            return list.requests.map((passenger, passengerIndex) => {
              return (
                <Passenger
                  nombre={passenger.user.fName + " " + passenger.user.lName}
                  carrera={passenger.user.major}
                  cohorte={passenger.user.usbid.split("-")[0]}
                  ruta={list.name}
                  comentario={passenger.comment}
                  onClick={this.prueba}
                  key={passengerIndex}
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
