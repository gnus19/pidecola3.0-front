import React, { Component } from "react";
import {
  editProfile,
  editProfilePicture,
  infoProfile,
} from "services/userServices";
import "assets/css/Profile.css";
import profilePicture from "assets/images/profilePicture.jpg";
import usercar from "assets/images/user-car.png";
import InputPC from "components/inputPc/InputPC";
import ImgContainer from "components/userImg/ImgContainer";
import DropDownList from "../components/dropDownList/DropDownList";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: "",
      profilePreview: profilePicture,
      email: "",
      firstName: "",
      lastName: "",
      carnet: "",
      age: "",
      phoneNumber: "",
      major: "",
      vehicles: [],
      showVehicle: usercar,
      vehicleIndex: 0,
      picChanged: false,
      responseError: "",
    };
  }

  // Solicita los datos del usuario en la base de datos para mostrarlos
  componentDidMount() {
    infoProfile()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        this.setState({
          email: response.data.email,
          carnet: response.data.email.split("@")[0],
          phoneNumber: response.data.phone_number,
          vehicles: response.data.vehicles,
        });

        if (response.data.first_name === undefined) {
        } else {
          this.setState({
            firstName: response.data.first_name,
          });
        }

        if (response.data.last_name === undefined) {
        } else {
          this.setState({
            lastName: response.data.last_name,
          });
        }

        if (response.data.age === undefined) {
        } else {
          this.setState({
            age: response.data.age,
          });
        }

        if (response.data.major === undefined) {
        } else {
          this.setState({
            major: response.data.major,
          });
        }

        if (response.data.vehicles.length === 0) {
        } else {
          this.setState({
            vehicles: response.data.vehicles,
            showVehicle: response.data.vehicles[0].vehicle_pic,
          });
        }

        if (response.data.profile_pic === undefined) {
          this.setState({
            profilePic: response.data.profile_pic,
          });
        } else {
          this.setState({
            profilePreview: response.data.profile_pic,
            profilePic: response.data.profile_pic,
          });
        }
      })

      .catch((error) => {
        console.log("Catch", error);
      });
  }

  // Actualiza los cambios de los inputs a medida que se escribe
  handleChange = (event) => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value,
    });
  };

  // Verifica que los datos introducidos cumplen con las reglas necesarias
  validProfile = () => {
    this.setState({
      responseError: "",
    });

    let valid = true;
    let errorMessage = "";

    if (this.state.firstName !== "" && !isNaN(this.state.firstName)) {
      errorMessage = errorMessage + "Introduce un nombre válido. ";
      valid = false;
    }

    if (this.state.lastName !== "" && !isNaN(this.state.lastName)) {
      errorMessage = errorMessage + "Introduce un apellido válido. ";
      valid = false;
    }

    if (
      (this.state.age !== "" && isNaN(this.state.age)) ||
      this.state.age < 16 ||
      this.state.age > 100
    ) {
      errorMessage = errorMessage + "Introduce una edad válida. ";
      valid = false;
    }

    if (this.state.phoneNumber.length !== 11) {
      errorMessage = errorMessage + "Introduce un número de teléfono válido. ";
      valid = false;
    }

    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.age === "" ||
      this.state.major === ""
    ) {
      errorMessage = errorMessage + "Todos los campos son requeridos. ";
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

  // Maneja las funciones de envío de los datos de perfil para su actualización
  sendEdit = (event) => {
    console.log("state: ", this.state);
    if (!this.validProfile()) {
      return;
    }
    this.sendProfileEdit(event);

    if (this.state.picChanged) {
      this.sendProfilePicEdit(event);
    } else {
      this.props.history.push({
        pathname: "/home",
      });
    }
  };

  // Envía los datos básicos de perfil para ser guardados
  sendProfileEdit = (event) => {
    event.preventDefault();
    const editBody = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      age: this.state.age,
      phone_number: this.state.phoneNumber,
      major: this.state.major,
    };
    editProfile(editBody)
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.log("Catch", error);
      });
  };

  // Envía la imagen de perfil para ser guardada
  sendProfilePicEdit = (event) => {
    event.preventDefault();
    let profilePicture = new FormData();
    profilePicture.append("file", this.state.profilePic);
    editProfilePicture(profilePicture)
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);
        if (response.status) {
          this.props.history.push({
            pathname: "/home",
          });
        }
      })
      .catch((error) => {
        console.log("Catch", error);
      });
  };

  // Apunta a la imagen para que funcione como botón para añadir imagen
  inputProfileClick() {
    document.getElementById("inputProfileImage").click();
  }

  // Muestra un preview de la imagen seleccionada
  profileImageSelected = (event) => {
    event.preventDefault();

    console.log("file: ", event.target.files[0]);

    this.setState({
      profilePic: event.target.files[0],
    });

    const myFileItemReader = new FileReader();
    myFileItemReader.addEventListener(
      "load",
      () => {
        this.setState({
          profilePreview: myFileItemReader.result,
          picChanged: true,
        });
      },
      false
    );
    myFileItemReader.readAsDataURL(event.target.files[0]);
  };

  // Muestra el vehículo anterior en la lista de vehículos registrados
  prevVehicle = (event) => {
    event.preventDefault();

    if (this.state.vehicles.length === 0 || this.state.vehicles.length === 1) {
      return;
    } else {
      if (this.state.vehicleIndex - 1 < 0) {
        this.setState({
          vehicleIndex: this.state.vehicles.length - 1,
          showVehicle: this.state.vehicles[this.state.vehicles.length - 1]
            .vehicle_pic,
        });
      } else {
        this.setState({
          vehicleIndex: this.state.vehicleIndex - 1,
          showVehicle: this.state.vehicles[this.state.vehicleIndex - 1]
            .vehicle_pic,
        });
      }
    }
  };

  // Muestra el siguiente vehículo en la lista de vehículos registrados
  nextVehicle = (event) => {
    event.preventDefault();

    if (this.state.vehicles.length === 0 || this.state.vehicles.length === 1) {
      return;
    } else {
      if (this.state.vehicleIndex + 1 === this.state.vehicles.length) {
        this.setState({
          vehicleIndex: 0,
          showVehicle: this.state.vehicles[0].vehicle_pic,
        });
      } else {
        this.setState({
          vehicleIndex: this.state.vehicleIndex + 1,
          showVehicle: this.state.vehicles[this.state.vehicleIndex + 1]
            .vehicle_pic,
        });
      }
    }
  };

  // Verifica la cantidad de vehículos registrados para permitir, o no, registrar más vehículos
  checkAddVehicle = () => {
    if (this.state.vehicles.length === 3) {
      this.setState({
        responseError: "El máximo de vehículos posibles es tres (3)",
      });
    } else {
      this.props.history.push({
        pathname: "/addVehicle",
      });
    }
  };

  // Verifica la cantidad de vehículos registrados para permitir eliminarlos
  checkDeleteVehicle = () => {
    if (this.state.vehicles.length === 0) {
      this.setState({
        responseError: "No existe vehículo registrado para eliminar",
      });
    } else {
      this.props.history.push({
        pathname: "/deleteVehicle",
      });
    }
  };

  render() {
    return (
      <div className="Profile">
        <div className="Section-Profile-Left">
          <div className="child1">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="inputProfileImage"
              id="inputProfileImage"
              onChange={this.profileImageSelected}
            />
            <div className="picture">
              <ImgContainer
                src={this.state.profilePreview}
                alt="Image Profile"
                id="profile"
                size="profile-img"
                onClick={this.inputProfileClick}
              />
            </div>
          </div>
          {!window.ismobile() && (
            <>
              <div className="child2">
                <div
                  className="profileButton"
                  id="prevButton"
                  onClick={this.prevVehicle}
                >
                  <i className="material-icons">arrow_left</i>
                </div>
                <div className="picture" id="vehicleImage">
                  <ImgContainer
                    src={this.state.showVehicle}
                    alt="Image Profile"
                    size="profile-img"
                  />
                </div>
                <div
                  className="profileButton"
                  id="nextButton"
                  onClick={this.nextVehicle}
                >
                  <i className="material-icons">arrow_right</i>
                </div>
              </div>
              <div className="child3">
                <div className="seccionAgregar" onClick={this.checkAddVehicle}>
                  <p>Agregar Vehículo</p>
                  <div className="profileButton">+</div>
                </div>
                <div
                  className="seccionEliminar"
                  onClick={this.checkDeleteVehicle}
                >
                  <p>Eliminar Vehículo</p>
                  <div className="profileButton">×</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="Section-Profile-Middle">
          {this.state.responseError !== "" && (
            <div className="responseProfileError">
              {this.state.responseError}
            </div>
          )}
          <InputPC
            fields={[
              {
                type: "input",
                label: "Nombre",
                value: this.state.firstName,
                attrs: { id: "firstName", onChange: this.handleChange },
              },
              {
                type: "input",
                label: "Apellido",
                value: this.state.lastName,
                attrs: { id: "lastName", onChange: this.handleChange },
              },
              {
                type: "input",
                label: "Edad",
                value: this.state.age,
                attrs: { id: "age", onChange: this.handleChange },
              },
            ]}
          />
          <InputPC
            fields={[
              {
                type: "input",
                label: "Carnet",
                value: this.state.carnet,
                attrs: {},
              },
              {
                type: "input",
                label: "Correo",
                value: this.state.email,
                attrs: {},
              },
              {
                type: "input",
                label: "Teléfono",
                value: this.state.phoneNumber,
                attrs: { id: "phoneNumber", onChange: this.handleChange },
              },
            ]}
          />
          <div className="carta">
            <DropDownList
              className="majorList"
              id="major"
              currentMajor={this.state.major}
              onChange={this.handleChange}
            ></DropDownList>
          </div>
          {window.ismobile() && (
            <>
              <div className="child2">
                <div
                  className="profileButton"
                  id="prevButton"
                  onClick={this.prevVehicle}
                >
                  <i className="material-icons">arrow_left</i>
                </div>
                <div className="picture" id="vehicleImage">
                  <ImgContainer
                    src={this.state.showVehicle}
                    alt="Image Profile"
                    size="profile-img"
                  />
                </div>
                <div
                  className="profileButton"
                  id="nextButton"
                  onClick={this.nextVehicle}
                >
                  <i className="material-icons">arrow_right</i>
                </div>
              </div>
              <div className="child3">
                <div className="seccionAgregar">
                  <p>Agregar Vehículo</p>
                  <div className="profileButton" onClick={this.checkAddVehicle}>
                    +
                  </div>
                </div>
                <div
                  className="seccionEliminar"
                  onClick={this.checkDeleteVehicle}
                >
                  <p>Eliminar Vehículo</p>
                  <div className="profileButton">×</div>
                </div>
              </div>
            </>
          )}
          <div className="SubSection-Add">
            <div className="guardarCambios" onClick={this.sendEdit}>
              Guardar cambios
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
