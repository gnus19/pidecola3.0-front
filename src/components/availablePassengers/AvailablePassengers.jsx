import React from "react";
import Button from "../button/Button";
import "./AvailablePassengers.css";

function AvailablePassengers() {
  return (
    <div className="container-fluid">
      <div className="sticky">
        <div className="carta">
          <p>
            AVEO-GRIS-AB000WY || <br />
            BARUTA-CHACAITO
          </p>
        </div>
        <Button
          className="red"
          text="Cancelar"
          onClick={() => {
            console.log("Clicked");
          }}
        />
      </div>
      <div className="carta grid-container">
        <div className="carnet">12-12345</div>
        <div className="foto"></div>
        <div className="nombre">
          Andre Corcuera <br /> Ing. computacion{" "}
        </div>
        <div className="ruta">
          Baruta-chacaito <br /> Me dirijo: Rosal{" "}
        </div>
        <div className="comentario">Comentario</div>
      </div>
      <div className="carta grid-container">
        <div className="carnet">12-12345</div>
        <div className="foto"></div>
        <div className="nombre">
          Andre Corcuera <br /> Ing. computacion{" "}
        </div>
        <div className="ruta">
          Baruta-chacaito <br /> Me dirijo: Rosal{" "}
        </div>
        <div className="comentario">Comentario</div>
      </div>
      <div className="carta grid-container">
        <div className="carnet">12-12345</div>
        <div className="foto"></div>
        <div className="nombre">
          Andre Corcuera <br /> Ing. computacion{" "}
        </div>
        <div className="ruta">
          Baruta-chacaito <br /> Me dirijo: Rosal{" "}
        </div>
        <div className="comentario">Comentario</div>
      </div>
      <div className="carta grid-container">
        <div className="carnet">12-12345</div>
        <div className="foto"></div>
        <div className="nombre">
          Andre Corcuera <br /> Ing. computacion{" "}
        </div>
        <div className="ruta">
          Baruta-chacaito <br /> Me dirijo: Rosal{" "}
        </div>
        <div className="comentario">Comentario</div>
      </div>
    </div>
  );
}

export default AvailablePassengers;
