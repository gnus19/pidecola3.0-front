import React, { Component } from "react";
import Button from "../components/button/Button";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import { NavLink } from "react-router-dom";

class AvailablePassengers extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      loadedPassengers: false
    }
  }
  
  componentDidMount() {
    setTimeout(
      () => {
        this.setState({loadedPassengers: true})
      },
      3000
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
          <div className="carta">
            <p>
              AVEO-GRIS-AB000WY || <br />
              BARUTA
            </p>
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
        </div>
        {
          this.state.loadedPassengers ?
          <div className="listaPasajeros">
          <Passenger
            nombre="André Corcuera"
            carrera="Ingeniería en Computación"
            año="12"
            parada="Baruta"
            inputComentario="Realmente voy a Las Mercedes"
          />
          </div>
          :
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        }
      </div>
    );
  }

}

export default AvailablePassengers;
