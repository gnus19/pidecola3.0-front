import React from "react";

function Passenger({ nombre, carrera, año, parada, inputComentario }) {
  return (
    <div className="carta grid-container">
      <div className="foto"></div>
      <div className="nombre">{nombre}</div>
      <div className="carrera">{carrera}</div>
      <div className="cohorte">Cohorte: </div>
      <div className="año">{año}</div>
      <div className="ruta">Ruta: </div>
      <div className="parada">{parada}</div>
      <div className="comentario">Comentario: </div>
      <div className="inputComentario">{inputComentario}</div>
    </div>
  );
}

export default Passenger;
