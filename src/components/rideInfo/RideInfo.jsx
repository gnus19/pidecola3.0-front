import React from "react";

function RideInfo({
  nombre,
  cohorte,
  carrera,
  ruta,
  numeroPasajeros,
  pasajeros
}) {
  return (
    <div className="carta grid-container-offer">
      <div className="foto"></div>
      <div className="titulo">{nombre} está dispuesto a darte la cola... </div>
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
      <div className="pasajeros">
        Pasajeros a bordo ({numeroPasajeros}): <span> {pasajeros}</span>
      </div>
    </div>
  );
}

export default RideInfo;
