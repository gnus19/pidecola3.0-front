import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { addVehicle, infoVehicle } from "services/userServices";
import "assets/css/VehicleDetail.css";
import usercar from "assets/images/user-car.png";
import InputPC from "components/inputPc/InputPC";
import ImgContainer from "components/userImg/ImgContainer";

class VehicleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehiclePreview: usercar,
      vehiclePic: null,
      plate: "",
      brand: "",
      model: "",
      year: "",
      color: "",
      vehicleCap: ""
    };
  }

  /*
  componentDidMount() {
    infoVehicle()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        this.setState({
          plate: response.data.plate,
          brand: response.data.brand,
          model: response.data.model,
          year: response.data.year,
          color: response.data.color,
          vehicleCap: response.data.vehicle_capacity
        });
      })
      .catch(error => {
        console.log("Catch", error);
      });
  }
  */

  handleEdit = event => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value
    });
  };

  sendVehicleEdit = event => {
    event.preventDefault();
    let info = new FormData();
    info.append("file", this.state.vehiclePic);
    info.append("plate", this.state.plate);
    info.append("brand", this.state.brand);
    info.append("model", this.state.model);
    info.append("year", this.state.year);
    info.append("color", this.state.color);
    info.append("vehicle_capacity", this.state.vehicleCap);
    console.log("Info: ", info);
    addVehicle(info)
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        this.setState({
          vehiclePic:
            response.data.vehicles[response.data.vehicles.length - 1]
              .vehicle_pic
        });
        this.props.history.push({
          pathname: "/profile"
        });
      })
      .catch(error => {
        console.log("Catch", error);
      });
  };

  vehicleImageSelected = event => {
    this.setState({
      vehiclePic: event.target.files[0]
    });

    const myFileItemReader = new FileReader();
    myFileItemReader.addEventListener(
      "load",
      () => {
        this.setState({ vehiclePreview: myFileItemReader.result });
      },
      false
    );
    myFileItemReader.readAsDataURL(event.target.files[0]);
  };

  inputVehicleClick() {
    document.getElementById("inputVehicleImage").click();
  }

  render() {
    return (
      <div className="VehicleDetail">
        <div className="Section-VehicleDetail-Left">
          <div className="child1">
            <input
              type="file"
              className="inputVehicleImage"
              id="inputVehicleImage"
              onChange={this.vehicleImageSelected}
            />
            <ImgContainer
              src={this.state.vehiclePreview}
              alt="Image Vehicle"
              onClick={this.inputVehicleClick}
            />
          </div>
        </div>
        <div className="Section-VehicleDetail-Right">
          <InputPC
            fields={[
              {
                type: "input",
                label: "Placa",
                value: this.state.plate,
                attrs: { id: "plate", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Marca",
                value: this.state.brand,
                attrs: { id: "brand", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Modelo",
                value: this.state.model,
                attrs: { id: "model", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Año",
                value: this.state.year,
                attrs: { id: "year", onChange: this.handleEdit }
              }
            ]}
          />
          <InputPC
            fields={[
              {
                type: "input",
                label: "Color",
                value: this.state.color,
                attrs: { id: "color", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Capacidad",
                value: this.state.vehicleCap,
                attrs: { id: "vehicleCap", onChange: this.handleEdit }
              }
            ]}
          />
          <div className="SubSection-Buttons">
            <NavLink to="/profile">
              <div className="acceptButton" onClick={this.sendVehicleEdit}>
                <p>Guardar</p>
              </div>
            </NavLink>
            <NavLink to="/profile">
              <div className="cancelButton">
                <p>Cancelar</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleDetail;
