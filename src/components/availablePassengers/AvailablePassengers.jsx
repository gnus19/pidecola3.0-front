import React from 'react'
import Button from '../button/Button';
import './AvailablePassengers.css';

function AvailablePassengers() {
	return (
		<div className="container-fluid">
			<div className="carta">
				<p>AVEO-GRIS-AB000WY || <br />
					BARUTA-CHACAITO
				</p>
			</div>
			<Button 
				className="red"
				text="Cancelar"
				onClick={() => {console.log('Clicked')}}
			/>
			<div className="carta grid-container">
				<div className="carnet">00-00000</div>
				<div className="foto">Foto</div>
				<div className="nombre">Nombre</div>
				<div className="ruta">Baruta-chacaito</div>
				<div className="comentario">Comentario</div>
			</div>
		</div>
	)
}

export default AvailablePassengers
