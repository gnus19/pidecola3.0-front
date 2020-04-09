import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { infoProfile, infoRide } from "services/userServices";
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

const removeLocalStorage = () => {
  localStorage.removeItem("tkauth");
};

const Main = ({ children }) => {
  const [profilePic, setProfilePic] = useState(profilePicture);
  const [firstName, setFirstName] = useState("Usuario");
  const [lastName, setLastName] = useState("");
  const [carnet, setCarnet] = useState("Carnet");

  useEffect(() => {
    const path = window.location.href.split("/")[
      window.location.href.split("/").length - 1
    ];

    if (path === "home") {
      document.getElementById("homeOptions").style.background = "#ffd302";
      document.getElementById("homeOptions").style.color = "#000";
      document.getElementById("profileOptions").style.background = "#1e2172";
      document.getElementById("profileOptions").style.color = "#fff";
      document.getElementById("statsOptions").style.background = "#1e2172";
      document.getElementById("statsOptions").style.color = "#fff";
      document.getElementById("helpOptions").style.background = "#1e2172";
      document.getElementById("helpOptions").style.color = "#fff";

      infoProfile()
        .then((res) => res.json())
        .then((response) => {
          if (response.data.profile_pic !== undefined) {
            setProfilePic(response.data.profile_pic);
          }
          if (response.data.first_name !== undefined) {
            setFirstName(response.data.first_name);
          }
          if (response.data.last_name !== undefined) {
            setLastName(response.data.last_name);
          }

          setCarnet(response.data.email.split("@")[0]);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem(
            "vehicleList",
            JSON.stringify(response.data.vehicles)
          );
        })

        .catch((error) => {
          console.log("Catch", error);
        });
      /*
      infoRide()
        .then((res) => res.json())
        .then((response) => {
          console.log("Response: ", response);

          if (response.status) {
            console.log("status: ", response.status);
            setActiveRide(response.status);
          }
        })

        .catch((error) => {
          console.log("Catch: ", error);
        });
        */
    } else if (path === "profile") {
      document.getElementById("profileOptions").style.background = "#ffd302";
      document.getElementById("profileOptions").style.color = "#000";
      document.getElementById("homeOptions").style.background = "#1e2172";
      document.getElementById("homeOptions").style.color = "#fff";
      document.getElementById("statsOptions").style.background = "#1e2172";
      document.getElementById("statsOptions").style.color = "#fff";
      document.getElementById("helpOptions").style.background = "#1e2172";
      document.getElementById("helpOptions").style.color = "#fff";
    } else if (path === "stats") {
      document.getElementById("statsOptions").style.background = "#ffd302";
      document.getElementById("statsOptions").style.color = "#000";
      document.getElementById("homeOptions").style.background = "#1e2172";
      document.getElementById("homeOptions").style.color = "#fff";
      document.getElementById("profileOptions").style.background = "#1e2172";
      document.getElementById("profileOptions").style.color = "#fff";
      document.getElementById("helpOptions").style.background = "#1e2172";
      document.getElementById("helpOptions").style.color = "#fff";
    } else if (path === "help") {
      document.getElementById("helpOptions").style.background = "#ffd302";
      document.getElementById("helpOptions").style.color = "#000";
      document.getElementById("homeOptions").style.background = "#1e2172";
      document.getElementById("homeOptions").style.color = "#fff";
      document.getElementById("profileOptions").style.background = "#1e2172";
      document.getElementById("profileOptions").style.color = "#fff";
      document.getElementById("statsOptions").style.background = "#1e2172";
      document.getElementById("statsOptions").style.color = "#fff";
    } else {
    }
  });

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
            <NavLink to="/home">
              <img className="HomeLogo" src={logo} alt="HomeLogo" />
            </NavLink>
          </div>
        </nav>
        <div id="Content-Sec">
          <nav className="Sidebar" id="Sidebar">
            <div className="HideOption" onClick={closeNav}>
              ×
            </div>
            <div className="sidebar-sticky">
              <div className="Info">
                <ImgContainer
                  src={profilePic}
                  alt="profilePicture pidecola"
                  size="menu"
                />
                <p className="Username">
                  {firstName} {lastName}
                </p>
                <p className="Carnet">{carnet}</p>
              </div>
              <ul className="nav flex-column">
                <NavLink to="/home">
                  <li className="Options" id="homeOptions">
                    <i className="material-icons">home</i>
                    <span>Inicio</span>
                  </li>
                </NavLink>
                <NavLink to="/profile">
                  <li className="Options" id="profileOptions">
                    <i className="material-icons">account_circle</i>
                    <span>Perfil</span>
                  </li>
                </NavLink>
                <NavLink to="/stats">
                  <li className="Options" id="statsOptions">
                    <i className="material-icons">assessment</i>
                    <span>Estadísticas</span>
                  </li>
                </NavLink>
                <NavLink to="/help">
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
};

export default Main;
