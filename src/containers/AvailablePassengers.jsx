import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getWaitingList } from "services/requestRideService";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import "../components/passenger/Passenger.css";

class AvailablePassengers extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  componentDidMount() {
    console.log(`${this.props.location.state.direction} - ${this.props.location.state.route}`);
    getWaitingList({destination: this.props.location.state.route})
    .then(res => res.json())
    .then(
      response => {
        console.log('Response', response);
      }
    )
    
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
            <p>{`${this.props.location.state.vehicle} || ${this.props.location.state.direction.toUpperCase()} USB || ${this.props.location.state.route.toUpperCase()}`}</p>
          </div>
          {/*<Button
          className="red"
          text="Cancelar"
          onClick={() => {
            console.log("Clicked");
          }}
        />*/}
          <NavLink className="cancelarButton" to="/home">
            Cancelar
          </NavLink>
        </div>
        <div className="listaPasajeros">
          <Passenger
            nombre="André Corcuera"
            carrera="Ingeniería en Computación"
            cohorte="12"
            ruta="Baruta"
            comentario="Realmente voy a Las Mercedes"
          />
        </div>
      </div>
    );
  }
}

export default AvailablePassengers;
