import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { infoProfile } from "services/userServices";
import logo from "assets/images/logo.png";
import list from "assets/images/list.svg";
import ImgContainer from "components/userImg/ImgContainer";
import profilePicture from "assets/images/profilePicture.jpg";

const openNav = () => {
  document.getElementById("Sidebar").style.width = "50%";
};

const closeNav = () => {
  if (window.screen.width <= 768) {
    document.getElementById("Sidebar").style.width = "0";
  }
};

const changeColor = id => {
  document.getElementById(id).style.background = "#ffd302";
  document.getElementById(id).style.color = "#000";

  if (id === "homeOptions") {
    document.getElementById("profileOptions").style.background = "#1e2172";
    document.getElementById("profileOptions").style.color = "#fff";
    document.getElementById("helpOptions").style.background = "#1e2172";
    document.getElementById("helpOptions").style.color = "#fff";
  } else if (id === "profileOptions") {
    document.getElementById("homeOptions").style.background = "#1e2172";
    document.getElementById("homeOptions").style.color = "#fff";
    document.getElementById("helpOptions").style.background = "#1e2172";
    document.getElementById("helpOptions").style.color = "#fff";
  } else if (id === "helpOptions") {
    document.getElementById("homeOptions").style.background = "#1e2172";
    document.getElementById("homeOptions").style.color = "#fff";
    document.getElementById("profileOptions").style.background = "#1e2172";
    document.getElementById("profileOptions").style.color = "#fff";
  }
};

const removeLocalStorage = () => {
  localStorage.removeItem("tkauth");
};

infoProfile()
  .then(res => res.json())
  .then(response => {
    console.log("Response: ", response);

    localStorage.setItem("carnet", response.data.email.split("@")[0]);

    if (
      response.data.first_name === undefined ||
      response.data.first_name === ""
    ) {
      localStorage.setItem("firstName", "Usuario");
    } else {
      localStorage.setItem("firstName", response.data.first_name);
    }

    if (
      response.data.last_name === undefined ||
      response.data.last_name === ""
    ) {
      localStorage.setItem("lastName", "");
    } else {
      localStorage.setItem("lastName", response.data.last_name);
    }

    if (response.data.profile_pic === undefined) {
      localStorage.setItem("profilePic", profilePicture);
    } else {
      localStorage.setItem("profilePic", response.data.profile_pic);
    }

    /*
    if (response.data.vehicles.length < 1) {
      localStorage.setItem("gotVehicle", false);
    } else {
      localStorage.setItem("gotVehicle", true);
    }
    */
  })

  .catch(error => {
    console.log("Catch", error);
  });

const Main = ({ children }) => {
  useEffect(() => {
    document.getElementById("profileOptions").style.background = "#1e2172";
    document.getElementById("profileOptions").style.color = "#fff";
    document.getElementById("helpOptions").style.background = "#1e2172";
    document.getElementById("helpOptions").style.color = "#fff";
  })
  return (
    <div className="HomePage">
      <div id="Content-Prin">
        <nav className="Top">
          <div className="TopOption">
            <button className="OptionButton" onClick={openNav}>
              <img className="OptionList" src={list} alt="OptionList" />
            </button>
          </div>
          <div className="TopLogo">
            <NavLink
              to="/home"
              onClick={() => {
                changeColor("homeOptions");
              }}
            >
              <img className="HomeLogo" src={logo} alt="HomeLogo" />
            </NavLink>
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
            <div className="sidebar-sticky">
              <div className="Info">
                <ImgContainer
                  src={localStorage.getItem("profilePic")}
                  alt="profilePicture pidecola"
                  height="65%"
                  width="65%"
                />
                <p className="Username">
                  {localStorage.getItem("firstName")}{" "}
                  {localStorage.getItem("lastName")}
                </p>
                <p className="Carnet">{localStorage.getItem("carnet")}</p>
              </div>
              <ul className="nav flex-column">
                <NavLink
                  to="/home"
                  onClick={() => {
                    changeColor("homeOptions");
                  }}
                >
                  <li className="Options" id="homeOptions">
                    <i className="material-icons">home</i>
                    <span>Inicio</span>
                  </li>
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => {
                    changeColor("profileOptions");
                  }}
                >
                  <li className="Options" id="profileOptions">
                    <i className="material-icons">account_circle</i>
                    <span>Perfil</span>
                  </li>
                </NavLink>
                <NavLink
                  to="/help"
                  onClick={() => {
                    changeColor("helpOptions");
                  }}
                >
                  <li className="Options" id="helpOptions">
                    <i className="material-icons">help</i>
                    <span>Ayuda</span>
                  </li>
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => {
                    removeLocalStorage("helpOptions");
                  }}
                >
                  <li className="Options" id="helpOptions">
                    <i className="material-icons">exit_to_app</i>
                    <span>Salir</span>
                  </li>
                </NavLink>
              </ul>
            </div>
          </nav>
          <div className="Main" id="main" onClick={closeNav}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Main;
