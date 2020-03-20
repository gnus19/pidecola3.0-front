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
      <div className="fotoConductor"></div>
      <div className="titulo">{nombre} está dispuesto a darte la cola... </div>
      <div className="nombreConductor">{nombre}</div>
      <div className="cohorteConductor">
        Cohorte: <span> {cohorte}</span>
      </div>
      <div className="carreraConductor">
        Carrera: <span> {carrera}</span>
      </div>
      <div className="rutaConductor">
        Ruta: <span> {ruta}</span>
      </div>
      <div className="pasajeros">
        Pasajeros a bordo ({numeroPasajeros}): <span> {pasajeros}</span>
      </div>
    </div>
  );
}

export default RideInfo;
