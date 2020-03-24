import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { requestRide } from "services/requestRideService";
import "assets/css/DeleteVehicle.css";
import DropDownList from "../components/dropDownList/DropDownList";
import InputPC from "../components/inputPc/InputPC";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import { infoProfile } from "services/userServices";

class DeleteVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: ""
    };
  }

  componentDidMount() {
    infoProfile()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        console.log("VEHICULO: ", response.data.vehicles[0]);
        this.setState({
          vehicles: response.data.vehicles
        });
      })
      .catch(error => {
        console.log("Catch", error);
      });
  }

  handleChange = event => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="seccionVehiculos"></div>
        <div className="listaVehiculos">
          <div className="carta">
            <DropDownList
              className="vehicleList"
              id="vehicle"
              onChange={this.handleChange}
              vehicleList={this.state.vehicles}
            ></DropDownList>
          </div>
        </div>
        <div className="eliminarCancelar">
          <NavLink to="/profile">
            <div className="deleteButton">
              <p>Eliminar</p>
            </div>
          </NavLink>
          <NavLink to="/profile">
            <div className="cancelDeleteButton">
              <p>Cancelar</p>
            </div>
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}

export default DeleteVehicle;
