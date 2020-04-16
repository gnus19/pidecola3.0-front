import React from "react";
import styles from "./rideProgressCard.module.css";

function RideProgressCard({ rideState }) {
  console.log("state", rideState);

  return (
    <div className={styles.card}>
      {/*<h5 id="estado">Estado de cola</h5>*/}
      {/*<span id="estado">Estado de la cola </span>*/}
      <p className={styles.estado}>Estado de la cola</p>
      {rideState === "esperando" && (
        <div className={styles.container}>
          <div className={styles.flex}>
            <div className={styles.waiting_sphere}></div>
            <div className={styles.no_color}></div>
            <div className={styles.no_color}></div>
          </div>
          <p className={styles.message}>En espera</p>
        </div>
      )}
      {rideState === "En Camino" && (
        <div className={styles.container}>
          <div className={styles.flex}>
            <div className={styles.no_color}></div>
            <div className={styles.going_sphere}></div>
            <div className={styles.no_color}></div>
          </div>
          <p className={styles.message}>En camino</p>
        </div>
      )}
      {rideState === "Finalizado" && (
        <div className={styles.container}>
          <div className={styles.flex}>
            <div className={styles.done_sphere}></div>
            <div className={styles.done_sphere}></div>
            <div className={styles.done_sphere}></div>
          </div>
          <p className={styles.message}>Finalizado</p>
        </div>
      )}
      {rideState === "Accidentado" && (
        <div className={styles.container}>
          <div className={styles.flex}>
            <div className={styles.accident_sphere}></div>
            <div className={styles.accident_sphere}></div>
            <div className={styles.accident_sphere}></div>
          </div>
          <p className={styles.message}>Accidentado</p>
        </div>
      )}
    </div>
  );
}

export default RideProgressCard;
