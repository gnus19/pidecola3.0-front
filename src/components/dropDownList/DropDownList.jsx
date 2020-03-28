import React from "react";

function dropDownList({ id, onChange, vehicleList, currentMajor }) {
  return (
    <React.Fragment>
      {id === "vehicle" ? (
        <React.Fragment>
          <label>Vehículo</label>
          <select id={id} onChange={onChange}>
            {vehicleList &&
              vehicleList.map(vehicle => {
                return (
                  <option value={vehicle.plate}>
                    {vehicle.brand.toUpperCase()} ||{" "}
                    {vehicle.model.toUpperCase()} ||{" "}
                    {vehicle.plate.toUpperCase()}
                  </option>
                );
              })}
          </select>
        </React.Fragment>
      ) : id === "direction" ? (
        <React.Fragment>
          <label>Dirección</label>
          <select id={id} onChange={onChange}>
            <option value="hacia">HACIA USB</option>
            <option value="desde">DESDE USB</option>
          </select>
        </React.Fragment>
      ) : id === "major" ? (
        <React.Fragment>
          <label>Carrera</label>
          <select id={id} onChange={onChange}>
            <option value={currentMajor}>{currentMajor.toUpperCase()}</option>
            <option value="Ciclo Básico"> CICLO BÁSICO</option>
            <option value="Arquitectura">ARQUITECTURA</option>
            <option value="Economía">ECONOMÍA</option>
            <option value="Ing. de Computación">ING. DE COMPUTACIÓN</option>
            <option value="Ing. Eléctrica">ING. ELÉCTRICA</option>
            <option value="Ing. Electrónica">ING. ELECTRÓNICA</option>
            <option value="Ing. Geofísica">ING. GEOFÍSICA</option>
            <option value="Ing. de Materiales">ING. DE MATERIALES</option>
            <option value="Ing. Mecánica">ING. MECÁNICA</option>
            <option value="Ing. de Producción">ING. DE PRODUCCIÓN</option>
            <option value="Ing. Química">ING. QUÍMICA</option>
            <option value="Ing. de Telecomunicaciones">
              ING. DE TELECOMUNICACIONES
            </option>
            <option value="Lic. en Biología">LIC. EN BIOLOGÍA</option>
            <option value="Lic. en Comercio Internacional">
              LIC. EN COMERCIO INTERNACIONAL
            </option>
            <option value="Lic. en Estudios y Artes Liberales">
              LIC. EN ESTUDIOS Y ARTES LIBERALES
            </option>
            <option value="Lic. en Física">LIC. EN FÍSICA</option>
            <option value="Lic. en Matemáticas">LIC. EN MATEMÁTICAS</option>
            <option value="Lic. en Química">LIC. EN QUÍMICA</option>
            <option value="Urbanismo">URBANISMO</option>
          </select>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <label>Ruta</label>
          <select id={id} onChange={onChange}>
            <option value="Baruta">BARUTA</option>
            <option value="Chacaito">CHACAITO</option>
            <option value="Coche">COCHE</option>
            <option value="Bellas Artes">BELLAS ARTES</option>
            <option value="La Paz">LA PAZ</option>
          </select>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default dropDownList;
