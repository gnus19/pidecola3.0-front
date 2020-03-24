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
      picChanged: false
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
          major: response.data.major
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

  sendEdit = event => {
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
            <ImgContainer
              src={this.state.profilePreview}
              alt="Image Profile"
              onClick={this.inputProfileClick}
            />
          </div>
          <div className="child2">
            <div className="ContentCar">
              <ImgContainer
                src={usercar}
                alt="Image Profile"
                height="130px"
                width="130px"
              />
              <p>Vehículo 1</p>
            </div>
          </div>
          <div className="child3">
            <div className="seccionAgregar">
              <p>Agregar Vehículo</p>
              <NavLink to="/addVehicle">
                <div className="PlusButton">+</div>
              </NavLink>
            </div>
            <div className="seccionEliminar">
              <p>Eliminar Vehículo</p>
              <NavLink to="/removeVehicle">
                <div className="DeleteButton">×</div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="Section-Profile-Right">
          <InputPC
            fields={[
              {
                type: "input",
                label: "Nombre",
                value: this.state.firstName,
                attrs: { id: "firstName", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Apellido",
                value: this.state.lastName,
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
              htmlFor="major"
              id="major"
              onChange={this.handleEdit}
            ></DropDownList>
          </div>
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
