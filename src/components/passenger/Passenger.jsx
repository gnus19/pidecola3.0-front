import React from "react";
import ImgContainer from "../userImg/ImgContainer";
import "./Passenger.css";
import profilePicture from "assets/images/profilePicture.jpg";

function Passenger({
  foto,
  nombre,
  carrera,
  usbid,
  cohorte,
  ruta,
  comentario,
  onClick,
  colaAceptada,
  telefono,
}) {
  return (
    <div className="carta grid-container" id={usbid} onClick={onClick}>
      <div className="foto">
        <ImgContainer
          src={foto === undefined ? profilePicture : foto}
          alt="Profile Picture"
          size="passenger-img"
        />
      </div>
      <div className="nombre">{nombre}</div>
      <div className="cohorte">
        Cohorte: <span> {cohorte}</span>
      </div>
      <div className="carrera">
        Carrera: <span> {carrera}</span>
      </div>
      <div className="ruta">
        Ruta: <span> {ruta}</span>
      </div>
      <div className="comentario">
        {colaAceptada === "true" ? (
          <div className="comentario" id="telefono">
            Teléfono: <span> {telefono}</span>
            <br />
          </div>
        ) : (
          <></>
        )}
        Comentario: <span> {comentario}</span>
      </div>
    </div>
  );
}

export default Passenger;
