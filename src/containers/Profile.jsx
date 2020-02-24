import React, { Component } from "react";
import "assets/css/Profile.css";
import InputPC from 'components/input-pc/InputPC'

class Profile extends Component {
	render() {
		return (
			<div className="Profile">
				<div className="Section-Profile-Left">

				</div>
				<div className="Section-Profile-Rigth">
					<InputPC
						fields = {[
							{
								type: 'input',
								label: 'Nombres',
								attrs: {}
							},
							{
								type: 'input',
								label: 'Apellidos',
								attrs: {}
							},
							{
								type: 'input',
								label: 'Carnets',
								attrs: {}
							}
						]}
					/>
					<InputPC
						fields = {[
							{
								type: 'input',
								label: 'Correo',
								attrs: {}
							},
							{
								type: 'input',
								label: 'Teléfono',
								attrs: {}
							}
						]}
					/>
					<InputPC
						fields = {[
							{
								type: 'input',
								label: 'Carrera',
								attrs: {}
							},
							{
								type: 'input',
								label: 'Dirección',
								attrs: {}
							}
						]}
					/>
					<div className="SubSection-Add">
						<div className="child1">
							<p>Agregar Vehículo</p>
							<div className="PlusButton">
								+
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile;