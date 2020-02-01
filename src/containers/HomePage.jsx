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
  render() {
    return (
      <div className="HomePage">
        <nav className="Top">
          <img className="OptionList" src={list} alt="OptionList" />
          <img className="Logo" src={logo} alt="Logo" />
        </nav>
        <div class="container-fluid">
          <div class="row">
            <nav className="Sidebar">
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
            <div className="Main">
              <OfferRequestRide />
            </div>
          </div>
        </div>
        {this.props.match.path === "/login"}
      </div>
    );
  }
}

export default HomePage;

/*
<nav class="sidenav---_u0En collapsed---2IIb7">
  <button role="button" class="sidenav-toggle---23_Hl" aria-expanded="false">
    <span class="icon-bar---2jamJ"></span>
    <span class="icon-bar---2jamJ"></span>
    <span class="icon-bar---2jamJ"></span>
  </button>
  <div role="menu" class="sidenav-nav---uvKqK">
    <div
      role="presentation"
      class="sidenav-navitem---3r9ER selected---91VwC highlighted---1vG8Y"
    >
      <div class="navitem---3LFxv" role="menuitem" tabindex="-1">
        <div class="navicon---d-E_g">
          <i
            class="fa fa-fw fa-home"
            style="font-size: 1.75em; vertical-align: middle;"
          ></i>
        </div>
        <div title="Home" class="navtext---2Ylza" style="padding-right: 32px;">
          Home
        </div>
      </div>
    </div>
    <div role="presentation" class="sidenav-navitem---3r9ER">
      <div class="navitem---3LFxv" role="menuitem" tabindex="-1">
        <div class="navicon---d-E_g">
          <i
            class="fa fa-fw fa-line-chart"
            style="font-size: 1.75em; vertical-align: middle;"
          ></i>
        </div>
        <div
          title="Devices"
          class="navtext---2Ylza"
          style="padding-right: 32px;"
        >
          Devices
        </div>
      </div>
    </div>
    <div role="presentation" class="sidenav-navitem---3r9ER">
      <div class="navitem---3LFxv" role="menuitem" tabindex="-1">
        <div class="navicon---d-E_g">
          <i
            class="fa fa-fw fa-list-alt"
            style="font-size: 1.75em; vertical-align: middle;"
          ></i>
        </div>
        <div
          title="Reports"
          class="navtext---2Ylza"
          style="padding-right: 32px;"
        >
          Reports
        </div>
      </div>
    </div>
    <div role="presentation" class="sidenav-navitem---3r9ER expandable---2ZpGQ">
      <div class="navitem---3LFxv" role="menuitem" tabindex="-1">
        <div class="navicon---d-E_g">
          <i
            class="fa fa-fw fa-cogs"
            style="font-size: 1.5em; vertical-align: middle;"
          ></i>
        </div>
        <div
          title="Settings"
          class="navtext---2Ylza"
          style="padding-right: 32px;"
        >
          Settings
        </div>
      </div>
      <div role="menu" class="sidenav-subnav---3Hr7K">
        <div role="heading" class="sidenav-subnavitem---3Rbfo">
          Settings
        </div>
        <div role="presentation" class="sidenav-subnavitem---3Rbfo">
          <div class="navitem---3LFxv" role="menuitem" tabindex="-1">
            <div title="Policies" class="navtext---2Ylza">
              Policies
            </div>
          </div>
        </div>
        <div role="presentation" class="sidenav-subnavitem---3Rbfo">
          <div class="navitem---3LFxv" role="menuitem" tabindex="-1">
            <div title="Network" class="navtext---2Ylza">
              Network
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

*/
