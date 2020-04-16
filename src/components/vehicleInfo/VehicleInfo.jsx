import React from "react";
import ImgContainer from "../userImg/ImgContainer";
import usercar from "assets/images/user-car.png";

function VehicleInfo({ foto, marca, modelo, color, placa }) {
  return (
    <div className="carta grid-container-vehicle">
      <div className="fotoVehiculo">
        <ImgContainer
          src={foto === undefined ? usercar : foto}
          alt="Car Picture"
          size="passenger-img"
        />
      </div>
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
