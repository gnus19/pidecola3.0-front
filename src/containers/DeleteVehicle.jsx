import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "assets/css/DeleteVehicle.css";
import { infoProfile, deleteVehicle } from "services/userServices";
import ImgContainer from "components/userImg/ImgContainer";
import InputPC from "components/inputPc/InputPC";

class DeleteVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: "",
      plate: "",
      brand: "",
      model: "",
      year: "",
      color: "",
      vehicleCap: "",
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

  /*
  handleChange = event => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value
    });
  };
  */

  sendDelete = event => {
    event.preventDefault();
    const vehiclePlate = {
      plate: this.state.plate
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

  selectVehicle = vehicleSelected => event => {
    event.preventDefault();

    this.state.vehicles.map(vehicleBackground => {
      const everyVehicle = document.getElementById(vehicleBackground.plate);
      return everyVehicle.children[0].children[0].style.background = "white";
    });

    const currentVehicle = document.getElementById(vehicleSelected.plate);
    currentVehicle.children[0].children[0].style.background = "#1e2172";
    this.setState({
      plate: vehicleSelected.plate,
      brand: vehicleSelected.brand,
      model: vehicleSelected.model,
      year: vehicleSelected.year,
      color: vehicleSelected.color,
      vehicleCap: vehicleSelected.vehicle_capacity
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="listaVehiculos">
          {this.state.vehicles &&
            this.state.vehicles.map(vehicle => {
              return (
                <div className="picture" id="listaVehiculos">
                  <div id={vehicle.plate}>
                    <ImgContainer
                      src={vehicle.vehicle_pic}
                      alt="Image Profile"
                      id="vehiculo"
                      onClick={this.selectVehicle(vehicle)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="infoVehiculos">
          {/*this.state.vehicles && (
              <DropDownList
                className="vehicleList"
                id="vehicle"
                onChange={this.handleChange}
                vehicleList={this.state.vehicles}
              ></DropDownList>
            )*/}
          <InputPC
            fields={[
              {
                type: "input",
                label: "Placa",
                value: this.state.plate.toUpperCase(),
                attrs: {}
              },
              {
                type: "input",
                label: "Marca",
                value: this.state.brand.toUpperCase(),
                attrs: {}
              },
              {
                type: "input",
                label: "Modelo",
                value: this.state.model.toUpperCase(),
                attrs: {}
              },
              {
                type: "input",
                label: "Año",
                value: this.state.year,
                attrs: {}
              },
              {
                type: "input",
                label: "Color",
                value: this.state.color.toUpperCase(),
                attrs: {}
              },
              {
                type: "input",
                label: "Capacidad",
                value: this.state.vehicleCap,
                attrs: {}
              }
            ]}
          />
        </div>
        <div className="eliminarCancelar">
          <NavLink to="/profile">
            <div className="deleteButton" onClick={this.sendDelete}>
              <p>Eliminar</p>
            </div>
          </NavLink>
          <NavLink to="/profile">
            <div className="cancelDeleteButton">
              <p>Atrás</p>
            </div>
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}

export default DeleteVehicle;
