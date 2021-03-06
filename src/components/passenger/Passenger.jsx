import React from "react";

function Passenger({ nombre, carrera, cohorte, ruta, comentario }) {
  return (
    <div className="carta grid-container">
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
