import React from "react";
import ImgContainer from "../userImg/ImgContainer";
import profilePicture from "assets/images/profilePicture.jpg";

function RideInfo({ foto, nombre, telefono, cohorte, carrera, ruta }) {
  return (
    <div className="carta grid-container-offer">
      <div className="fotoConductor">
        <ImgContainer
          src={foto === undefined ? profilePicture : foto}
          alt="Profile Picture"
          size="passenger-img"
        />
      </div>
      <div className="titulo">
        {nombre} <span> está dispuesto a darte la cola...</span>{" "}
      </div>
      <div className="cohorteConductor">
        Cohorte: <span> {cohorte}</span>
      </div>
      <div className="telefonoConductor">
        Teléfono: <span> {telefono}</span>
      </div>
      <div className="carreraConductor">
        Carrera: <span> {carrera}</span>
      </div>
      <div className="rutaConductor">
        Ruta: <span> {ruta}</span>
      </div>
    </div>
  );
}

export default RideInfo;
