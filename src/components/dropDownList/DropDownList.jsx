import React from "react";

function dropDownList({ htmlFor, id, onChange }) {
  return (
    <div>
      {id == "vehicle" ? (
        <div>
          <label htmlFor={htmlFor}>Vehículo</label>
          <select id={id} onChange={onChange}>
            <option value="AVEO-GRIS-AB123SS">AVEO-GRIS-AB123SS</option>
            <option value="OPTRA-ROSADO-BG134PW">OPTRA-ROSADO-BG134PW</option>
            <option value="WOLFWAGEN-AMARILLO-NZ944SC">WOLFWAGEN-AMARILLO-NZ944SC</option>
          </select>
        </div>
      ) : id == "direction" ? (
        <div>
          <label htmlFor={htmlFor}>Dirección</label>
          <select id={id} onChange={onChange}>
            <option value="hacia">HACIA USB</option>
            <option value="desde">DESDE USB</option>
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor={htmlFor}>Ruta</label>
          <select id={id} onChange={onChange}>
            <option value="Baruta">BARUTA</option>
            <option value="Chacaito">CHACAITO</option>
            <option value="Coche">COCHE</option>
            <option value="Bellas Artes">BELLAS ARTES</option>
            <option value="La Paz">LA PAZ</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default dropDownList;
