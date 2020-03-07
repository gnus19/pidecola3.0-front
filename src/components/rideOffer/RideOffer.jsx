import React from "react";

function RideOffer({
  nombre,
  carrera,
  año,
  parada,
  numeroPasajeros,
  listaPasajeros
}) {
  return (
    <div className="carta grid-container-offer">
      <div className="foto"></div>
      <div className="titulo">{nombre} está dispuesto a darte la cola... </div>
      <div className="nombre">{nombre}</div>
      <div className="carrera">{carrera}</div>
      <div className="cohorte">Cohorte: </div>
      <div className="año">{año}</div>
      <div className="ruta">Ruta: </div>
      <div className="parada">{parada}</div>
      <div className="numeroPasajeros">
        Pasajeros a bordo ({numeroPasajeros}):
      </div>
      <div className="listaPasajeros">{listaPasajeros}</div>
    </div>
  );
}

export default RideOffer;
