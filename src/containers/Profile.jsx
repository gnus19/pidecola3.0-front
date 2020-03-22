import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { editProfile, infoProfile } from "services/userServices";
import "assets/css/Profile.css";
import profilePicture from "assets/images/profilePicture.jpg";
import usercar from "assets/images/user-car.png";
import InputPC from "components/inputPc/InputPC";
import ImgContainer from "components/userImg/ImgContainer";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      carnet: "",
      age: "",
      phoneNumber: "",
      major: ""
    };
  }

  componentDidMount() {
    infoProfile()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        this.setState({
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
    event.preventDefault();

    const editBody = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      age: this.state.age,
      phone_number: this.state.phoneNumber,
      major: this.state.major
    };
    console.log("send edit body: ", editBody);
    editProfile(editBody)
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
      })
      .catch(error => {
        console.log("Catch", error);
      });
  };

  render() {
    return (
      <div className="Profile">
        <div className="Section-Profile-Left">
          <div className="child1">
            <ImgContainer src={profilePicture} alt="Image Profile" />
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
                label: "Correo",
                value: this.state.email,
                attrs: { id: "email", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Teléfono",
                value: this.state.phoneNumber,
                attrs: { id: "phoneNumber", onChange: this.handleEdit }
              }
            ]}
          />
          <InputPC
            fields={[
              {
                type: "input",
                label: "Carrera",
                value: this.state.major,
                attrs: { id: "major", onChange: this.handleEdit }
              },
              {
                type: "input",
                label: "Carnet",
                value: this.state.carnet,
                attrs: { id: "carnet", onChange: this.handleEdit }
              }
            ]}
          />
          <div className="SubSection-Add">
            <div className="child1">
              <p>Agregar Vehículo</p>
              <NavLink to="/addVehicle">
                <div className="PlusButton">+</div>
              </NavLink>
            </div>
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
