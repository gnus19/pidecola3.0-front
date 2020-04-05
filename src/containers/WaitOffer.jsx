import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import global from '../global.js'
import io from 'socket.io-client';
// const socket  = io(global.SERVER);

class WaitOffer extends Component{

  constructor(props){
    super(props)
    this.socket = io(global.SERVER);
  }

  componentDidMount() {
    // if (socket && !socket.connected) socket.connect();
    this.socket.on('connect', () => console.log('connected Scoket'))
    this.socket.on('reconnecting', times => console.log('Reconnecting' + times))
    this.socket.on('disconnect', reason => console.log('Reconnecting' + reason))

    this.socket.on('rideOffer', msg => {
      console.log(msg)
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="sticky">
          <RecommendationBanner />
          {/*<div className="pidecola-message" text="">
            Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
          </div>*/}
          <div className="cartaInfo">
            <p>{`${this.props.location.state.direction.toUpperCase()} USB || ${this.props.location.state.route.toUpperCase()}`}</p>
          </div>
          {/*<Button
            className="red"
            text="Cancelar"
            onClick={() => {
              console.log("Clicked");
            }}
          />*/}
          <NavLink
            className="cancelarButton"
            onClick={() => {
              console.log("Clicked");
            }}
            to="/home"
          >
            Cancelar
          </NavLink>
          <div style={{ margin: "100px" }}>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>
              Espere ...
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default WaitOffer;
