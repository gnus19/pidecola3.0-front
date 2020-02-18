import React from "react";

function dropDownList({ htmlFor, id }) {
  return (
    <div>
      {id == "vehicle" ? (
        <div>
          <label htmlFor={htmlFor}>Vehículo</label>
          <select id={id}>
            <option>AVEO-GRIS-AB123SS</option>
            <option>OPTRA-ROSADO-BG134PW</option>
            <option>WOLFWAGEN-AMARILLO-NZ944SC</option>
          </select>
        </div>
      ) : id == "direction" ? (
        <div>
          <label htmlFor={htmlFor}>Dirección</label>
          <select id={id}>
            <option>HACIA USB</option>
            <option>DESDE USB</option>
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor={htmlFor}>Ruta</label>
          <select id={id}>
            <option>BARUTA</option>
            <option>CHACAITO</option>
            <option>COCHE</option>
            <option>BELLAS ARTES</option>
            <option>LA PAZ</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default dropDownList;
