import React, { useState } from "react";
import ImgContainer from "../userImg/ImgContainer";

function Passenger({
  foto,
  nombre,
  carrera,
  usbid,
  cohorte,
  ruta,
  comentario,
  onClick
}) {
  const [clicked, setClicked] = useState(false);

  const changeClick = () => {
    // if (clicked) {
    //   setClicked(false);
    //   document.getElementById("cartaPasajero").style.background = "white";
    // } else {
    //   setClicked(true);
    //   document.getElementById("cartaPasajero").style.background = "#4caf50";
    // }
  };

  return (
    <div className="carta grid-container" id={usbid} onClick={onClick}>
      <div className="foto">
        <ImgContainer src={foto} alt="Profile Picture" />
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
        Comentario: <span> {comentario}</span>
      </div>
    </div>
  );
}

export default Passenger;
