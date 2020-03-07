import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "assets/css/Profile.css";
import profilePicture from "assets/images/profilePicture.jpg";
import usercar from "assets/images/user-car.png";
import InputPC from "components/inputPc/InputPC";
import ImgContainer from "components/userImg/ImgContainer";

class Profile extends Component {
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
                label: "Nombres",
                attrs: {}
              },
              {
                type: "input",
                label: "Apellidos",
                attrs: {}
              },
              {
                type: "input",
                label: "Edad",
                attrs: {}
              }
            ]}
          />
          <InputPC
            fields={[
              {
                type: "input",
                label: "Correo",
                attrs: {}
              },
              {
                type: "input",
                label: "Teléfono",
                attrs: {}
              }
            ]}
          />
          <InputPC
            fields={[
              {
                type: "input",
                label: "Carrera",
                attrs: {}
              },
              {
                type: "input",
                label: "Carnet",
                attrs: {}
              }
            ]}
          />
          <div className="SubSection-Add">
            <NavLink to="/addVehicle">
              <div className="child1">
                <p>Agregar Vehículo</p>
                <div className="PlusButton">+</div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
