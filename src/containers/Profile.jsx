import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  editProfile,
  editProfilePicture,
  infoProfile
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
      vehicles: "",
      showVehicle: "",
      vehicleIndex: 0,
      picChanged: false,
      responseError: ""
    };
  }

  componentDidMount() {
    infoProfile()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        this.setState({
          profilePreview: response.data.profile_pic,
          profilePic: response.data.profile_pic,
          email: response.data.email,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          carnet: response.data.email.split("@")[0],
          age: response.data.age,
          phoneNumber: response.data.phone_number,
          major: response.data.major,
          vehicles: response.data.vehicles,
          showVehicle: response.data.vehicles[0]
        });
      })
      .catch(error => {
        console.log("Catch", error);
      });
  }

  handleEdit = event => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value
    });
  };

  validProfile = () => {
    this.setState({
      responseError: ""
    });

    let valid = true;
    let errorMessage = "";

    if (!isNaN(this.state.firstName)) {
      errorMessage = errorMessage + "Introduce un nombre válido. ";
      valid = false;
    }

    if (!isNaN(this.state.lastName)) {
      errorMessage = errorMessage + "Introduce un apellido válido. ";
      valid = false;
    }

    if (isNaN(this.state.age)) {
      errorMessage = errorMessage + "Introduce una edad válida. ";
      valid = false;
    }

    if (this.state.phoneNumber.length !== 11) {
      errorMessage = errorMessage + "Introduce un número de teléfono válido. ";
      valid = false;
    }

    if (!valid) {
      this.setState({
        responseError: errorMessage
      });
      return false;
    }

    return true;
  };

  sendEdit = event => {
    if (!this.validProfile()) {
      return;
    }
    this.sendProfileEdit(event);
    if (this.state.picChanged) {
      this.sendProfilePicEdit(event);
    }
  };

  sendProfileEdit = event => {
    event.preventDefault();
    const editBody = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      age: this.state.age,
      phone_number: this.state.phoneNumber,
      major: this.state.major
    };
    editProfile(editBody)
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
      })
      .catch(error => {
        console.log("Catch", error);
      });
  };

  sendProfilePicEdit = event => {
    event.preventDefault();
    let profilePicture = new FormData();
    profilePicture.append("file", this.state.profilePic);
    editProfilePicture(profilePicture)
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        this.setState({ profilePreview: response.data.profile_pic });
      })
      .catch(error => {
        console.log("Catch", error);
      });
  };

  inputProfileClick() {
    document.getElementById("inputProfileImage").click();
  }

  profileImageSelected = event => {
    event.preventDefault();
    this.setState({
      profilePic: event.target.files[0]
    });

    const myFileItemReader = new FileReader();
    myFileItemReader.addEventListener(
      "load",
      () => {
        this.setState({
          profilePreview: myFileItemReader.result,
          picChanged: true
        });
      },
      false
    );
    myFileItemReader.readAsDataURL(event.target.files[0]);
  };

  prevVehicle = event => {
    event.preventDefault();

    if (this.state.vehicles.length === 0 || this.state.vehicles.length === 1) {
      return;
    } else {
      if (this.state.vehicleIndex - 1 < 0) {
        this.setState({
          vehicleIndex: this.state.vehicles.length - 1,
          showVehicle: this.state.vehicles[this.state.vehicles.length - 1]
        });
      } else {
        this.setState({
          vehicleIndex: this.state.vehicleIndex - 1,
          showVehicle: this.state.vehicles[this.state.vehicleIndex - 1]
        });
      }
    }
  };

  nextVehicle = event => {
    event.preventDefault();

    if (this.state.vehicles.length === 0 || this.state.vehicles.length === 1) {
      return;
    } else {
      if (this.state.vehicleIndex + 1 === this.state.vehicles.length) {
        this.setState({
          vehicleIndex: 0,
          showVehicle: this.state.vehicles[0]
        });
      } else {
        this.setState({
          vehicleIndex: this.state.vehicleIndex + 1,
          showVehicle: this.state.vehicles[this.state.vehicleIndex + 1]
        });
      }
    }
  };

  render() {
    return (
      <div className="Profile">
        <div className="Section-Profile-Left">
          <div className="child1">
            <input
              type="file"
              className="inputProfileImage"
              id="inputProfileImage"
              onChange={this.profileImageSelected}
            />
            <div className="picture">
              <ImgContainer
                src={this.state.profilePreview}
                alt="Image Profile"
                id="profile"
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
                    src={this.state.showVehicle.vehicle_pic}
                    alt="Image Profile"
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
                  <NavLink to="/addVehicle">
                    <div className="profileButton">+</div>
                  </NavLink>
                </div>
                <div className="seccionEliminar">
                  <p>Eliminar Vehículo</p>
                  <NavLink to="/deleteVehicle">
                    <div className="profileButton">×</div>
                  </NavLink>
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
                value: this.state.firstName.toUpperCase(),
                attrs: { id: "firstName", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Apellido",
                value: this.state.lastName.toUpperCase(),
                attrs: { id: "lastName", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Edad",
                value: this.state.age,
                attrs: { id: "age", onChange: this.handleEdit }
              }
            ]}
          />
          <InputPC
            fields={[
              {
                type: "input",
                label: "Carnet",
                value: this.state.carnet,
                attrs: {}
              },
              {
                type: "input",
                label: "Correo",
                value: this.state.email,
                attrs: {}
              },
              {
                type: "input",
                label: "Teléfono",
                value: this.state.phoneNumber,
                attrs: { id: "phoneNumber", onChange: this.handleEdit }
              }
            ]}
          />
          <div className="carta">
            <DropDownList
              className="majorList"
              id="major"
              currentMajor={this.state.major}
              onChange={this.handleEdit}
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
                    src={this.state.showVehicle.vehicle_pic}
                    alt="Image Profile"
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
                  <NavLink to="/addVehicle">
                    <div className="profileButton">+</div>
                  </NavLink>
                </div>
                <div className="seccionEliminar">
                  <p>Eliminar Vehículo</p>
                  <NavLink to="/deleteVehicle">
                    <div className="profileButton">×</div>
                  </NavLink>
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
