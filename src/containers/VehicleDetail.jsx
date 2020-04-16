import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { addVehicle } from "services/userServices";
import "assets/css/VehicleDetail.css";
import usercar from "assets/images/user-car.png";
import InputPC from "components/inputPc/InputPC";
import ImgContainer from "components/userImg/ImgContainer";

class VehicleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehiclePreview: usercar,
      vehiclePic: "",
      plate: "",
      brand: "",
      model: "",
      year: "",
      color: "",
      vehicleCap: "",
      responseError: "",
    };
  }

  // Actualiza los cambios de los inputs a medida que son modificados
  handleChange = (event) => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value,
    });
  };

  // Verifica que los datos introducidos cumplen con las reglas necesarias
  validVehicle = () => {
    this.setState({
      responseError: "",
    });

    let valid = true;
    let errorMessage = "";

    if (
      this.state.plate !== "" &&
      (this.state.plate.length < 6 || this.state.plate.length > 7)
    ) {
      errorMessage = errorMessage + "Introduce una placa válida. ";
      valid = false;
    }

    if (
      this.state.year !== "" &&
      (isNaN(this.state.year) || this.state.year.length !== 4)
    ) {
      errorMessage = errorMessage + "Introduce un año válido. ";
      valid = false;
    }

    if (isNaN(this.state.vehicleCap)) {
      errorMessage =
        errorMessage + "Capacidad solo puede ser un valor numérico. ";
      valid = false;
    }

    if (this.state.vehicleCap < 1) {
      errorMessage = errorMessage + "Capacidad debe ser mínimo uno (1). ";
      valid = false;
    }

    if (
      this.state.plate === "" ||
      this.state.brand === "" ||
      this.state.model === "" ||
      this.state.year === "" ||
      this.state.color === "" ||
      this.state.vehicleCap === ""
    ) {
      errorMessage = errorMessage + "Todos los campos son requeridos. ";
      valid = false;
    }

    if (this.state.vehiclePic === "") {
      errorMessage = errorMessage + "Agrega una imagen del vehículo.";
      valid = false;
    }

    if (!valid) {
      this.setState({
        responseError: errorMessage,
      });
      return false;
    }

    return true;
  };

  // Envía los datos del vehículo para ser guardados
  sendVehicleEdit = (event) => {
    event.preventDefault();

    if (!this.validVehicle()) {
      return;
    }

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
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        if (response.status) {
          this.props.history.push({
            pathname: "/profile",
          });
        }
      })
      .catch((error) => {
        console.log("Catch", error);
      });
  };

  // Muestra un preview de la imagen seleccionada
  vehicleImageSelected = (event) => {
    this.setState({
      vehiclePic: event.target.files[0],
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

  // Apunta a la imagen para que funcione como botón para añadir imagen
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
              accept=".jpg,.jpeg,.png"
              className="inputVehicleImage"
              id="inputVehicleImage"
              onChange={this.vehicleImageSelected}
            />
            <ImgContainer
              src={this.state.vehiclePreview}
              alt="Image Vehicle"
              id="vehicle"
              size="detail-vehicle-img"
              onClick={this.inputVehicleClick}
            />
          </div>
        </div>
        <div className="Section-VehicleDetail-Right">
          {this.state.responseError !== "" && (
            <div className="responseVehicleError">
              {this.state.responseError}
            </div>
          )}
          <InputPC
            fields={[
              {
                type: "input",
                label: "Placa",
                value: this.state.plate,
                attrs: { id: "plate", onChange: this.handleChange },
              },
              {
                type: "input",
                label: "Marca",
                value: this.state.brand,
                attrs: { id: "brand", onChange: this.handleChange },
              },
              {
                type: "input",
                label: "Modelo",
                value: this.state.model,
                attrs: { id: "model", onChange: this.handleChange },
              },
              {
                type: "input",
                label: "Año",
                value: this.state.year,
                attrs: { id: "year", onChange: this.handleChange },
              },
              {
                type: "input",
                label: "Color",
                value: this.state.color,
                attrs: { id: "color", onChange: this.handleChange },
              },
              {
                type: "input",
                label: "Capacidad",
                value: this.state.vehicleCap,
                attrs: { id: "vehicleCap", onChange: this.handleChange },
              },
            ]}
          />
          <div className="SubSection-Buttons">
            <div className="acceptButton" onClick={this.sendVehicleEdit}>
              <p>Guardar</p>
            </div>
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
