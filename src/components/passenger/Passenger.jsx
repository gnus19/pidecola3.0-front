import React, { useState } from "react";

function Passenger({ nombre, carrera, cohorte, ruta, comentario, onClick }) {
  const [clicked, setClicked] = useState(false);

  const changeClick = () => {
    if (clicked) {
      setClicked(false);
      document.getElementById("cartaPasajero").style.background = "white";
    } else {
      setClicked(true);
      document.getElementById("cartaPasajero").style.background = "#4caf50";
    }
  };

  return (
    <div
      className="carta grid-container"
      id="cartaPasajero"
      onClick={changeClick}
    >
      <div className="foto"></div>
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
