import React, { Component } from "react";
import "assets/css/HomePage.css";
import logo from "assets/images/logo.png";
import list from "assets/images/list.svg";
import houseFill from "assets/images/houseFill.svg";
import personFill from "assets/images/personFill.svg";
import infoFill from "assets/images/infoFill.svg";
import profilePicture from "assets/images/profilePicture.jpg";
import OfferRequestRide from "../components/offer-request-ride/OfferRequestRide";

class HomePage extends Component {
  openNav = () => {
    document.getElementById("Sidebar").style.width = "50%";
  };

  closeNav = () => {
    document.getElementById("Sidebar").style.width = "0";
  };

  render() {
    return (
      <div className="HomePage">
        <nav className="Top">
          <div className="TopOption">
            <button className="OptionButton" onClick={this.openNav}>
              <img className="OptionList" src={list} alt="OptionList" />
            </button>
          </div>
          <div className="TopLogo">
            <img className="HomeLogo" src={logo} alt="HomeLogo" />
          </div>
        </nav>
        <div class="container-fluid" id="container-fluid">
          <div class="row" id="row">
            <nav className="Sidebar" id="Sidebar">
              <a
                href="javascript:void(0)"
                className="HideOption"
                onClick={this.closeNav}
              >
                ×
              </a>
              <div class="sidebar-sticky">
                <div className="Info">
                  <img
                    className="ProfilePicture"
                    src={profilePicture}
                    alt="profilePicture pidecola"
                  />
                  <p className="Username">Usuario</p>
                  <p className="Carnet">Carnet</p>
                </div>
                <ul class="nav flex-column">
                  <li className="Options">
                    <img
                      className="HouseFill"
                      src={houseFill}
                      alt="HouseFill"
                    />
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Inicio
                    </span>
                  </li>
                  <li className="Options">
                    <img
                      className="PersonFill"
                      src={personFill}
                      alt="PersonFill"
                    />
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Perfil
                    </span>
                  </li>
                  <li className="Options">
                    <img className="InfoFill" src={infoFill} alt="InfoFill" />
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Ayuda
                    </span>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="Main" id="main">
              <OfferRequestRide {...this.props}/>
            </div>
          </div>
        </div>
        {this.props.match.path === "/login"}
      </div>
    );
  }
}

export default HomePage;
