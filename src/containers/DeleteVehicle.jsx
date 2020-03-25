import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "assets/css/DeleteVehicle.css";
import DropDownList from "../components/dropDownList/DropDownList";
import { infoProfile, deleteVehicle } from "services/userServices";

class DeleteVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: "",
      deleted: false
    };
  }

  componentDidMount() {
    infoProfile()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
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

  sendDelete = event => {
    event.preventDefault();
    const toDelete = document.getElementById("vehicle");
    const vehiclePlate = {
      plate: toDelete.value
    };

    deleteVehicle(vehiclePlate)
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        if (response.status) {
          this.props.history.push({
            pathname: "/profile"
          });
        }
      })
      .catch(error => {
        console.log("Catch", error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="seccionVehiculos"></div>
        <div className="listaVehiculos">
          <div className="carta">
            {this.state.vehicles && (
              <DropDownList
                className="vehicleList"
                id="vehicle"
                onChange={this.handleChange}
                vehicleList={this.state.vehicles}
              ></DropDownList>
            )}
          </div>
        </div>
        <div className="eliminarCancelar">
          <NavLink to="/profile">
            <div className="deleteButton" onClick={this.sendDelete}>
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
