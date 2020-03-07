import React from "react";

function VehicleInfo({ marca, modelo, color, placa }) {
  return (
    <div className="carta grid-container-vehicle">
      <div className="fotoVehiculo"></div>
      <div className="marca">
        Marca: <span> {marca}</span>
      </div>
      <div className="modelo">
        Modelo: <span> {modelo}</span>
      </div>
      <div className="color">
        Color: <span> {color}</span>
      </div>
      <div className="placa">
        Placa: <span> {placa}</span>
      </div>
    </div>
  );
}

export default VehicleInfo;
