import React from 'react';
import logo from "assets/images/logo.png";
import list from "assets/images/list.svg";
import profilePicture from "assets/images/profilePicture.jpg";

const openNav = () => {
    document.getElementById("Sidebar").style.width = "50%";
};

const closeNav = () => {
    document.getElementById("Sidebar").style.width = "0";
};

const Main = ({children}) => (
    <div className="HomePage">
    <div id="Content-Prin">
        <nav className="Top">
            <div className="TopOption">
            <button className="OptionButton" onClick={openNav}>
                <img className="OptionList" src={list} alt="OptionList" />
            </button>
            </div>
            <div className="TopLogo">
            <img className="HomeLogo" src={logo} alt="HomeLogo" />
            </div>
        </nav>
      <div id="Content-Sec">
        <nav className="Sidebar" id="Sidebar">
          <a
            href="javascript:void(0)"
            className="HideOption"
            onClick={closeNav}
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
                <i class="material-icons">
                  home
                </i>
                <span>
                  Inicio
                </span>
              </li>
              <li className="Options">
                <i class="material-icons">
                account_circle
                </i>
                <span>
                  Perfil
                </span>
              </li>
              <li className="Options">
                <i class="material-icons">
                  help
                </i>
                <span>
                  Ayuda
                </span>
              </li>
            </ul>
          </div>
        </nav>
        <div className="Main" id="main">
            {children}
        </div>
      </div>
    </div>
  </div>
);

export default Main;

