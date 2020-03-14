import React, {useState} from 'react'
// import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'

import Button from "components/button/Button";
// import { Route } from 'react-router-dom';
import './RoutesList.css';

function RoutesList({ match: { url, params } }) {
	
	// const [show, setShow] = useState(true);

	return (
		<div className="offer-request-content container-fluid">
			{/* Routes {params.accion} */}
      {/* <Alert show={show} variant="danger">
        <Alert.Heading>
					sss
					<Button onClick={() => setShow(false)} variant="outline-danger">
						X
					</Button>
				</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
      </Alert> */}
			<div className="pidecola-message">
				Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
			</div>
			<div className="carta">
				<label htmlFor="vehicle">Vehículo</label>
				<select id="vehicle">
					<option>AVEO-GRIS-AB123SS</option>
					<option>OPTRA-ROSADO-BG134PW</option>
					<option>WOLFWAGEN-AMARILLO-NZ944SC</option>
				</select>
			</div>
			<div className="carta">
				<div className="separador">
					<label htmlFor="direction">Dirección</label>
					<select id="direction">
						<option>HACIA USB</option>
						<option>DESDE USB</option>
					</select>
				</div>
				<div>
					<label htmlFor="route">Ruta</label>
					<select id="route">
						<option>BARUTA-CHACAITO</option>
						<option>COCHE-CHACAITO</option>
						<option>COCHE-PLZ. VENEZUELA</option>
						<option>COCHE-BELLAS ARTES</option>
						<option>BARUTA-PLZ. VENEZUELA</option>
					</select>
				</div>
			</div>
			<Button
				className="blue"
				text="BUSCAR"
				onClick={event => console.log('Clicked')}
			/>
		</div>
	)
}

export default RoutesList
