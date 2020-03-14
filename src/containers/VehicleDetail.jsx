import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "assets/css/VehicleDetail.css";
// import VehicleDetailPicture from "assets/images/VehicleDetailPicture.jpg"
import usercar from "assets/images/user-car.png"
import InputPC from 'components/input-pc/InputPC'
import ImgContainer from 'components/user-img/ImgContainer'

class VehicleDetail extends Component {
	render() {
		return (
			<div className="VehicleDetail">
				<div className="Section-VehicleDetail-Left">
					<div className="child1">
						<ImgContainer 
							src={usercar}
							alt="Image Vehicle"
						/>
					</div>
				</div>
				<div className="Section-VehicleDetail-Rigth">
					<InputPC
						fields = {[
							{
								type: 'input',
								label: 'Placa',
								attrs: {}
							},
							{
								type: 'input',
								label: 'Marca',
								attrs: {}
							},
							{
								type: 'input',
								label: 'Modelo',
								attrs: {}
							},
							{
								type: 'input',
								label: 'Año',
								attrs: {}
							}
							
						]}
					/>
					<InputPC
						fields = {[
							{
								type: 'input',
								label: 'Color',
								attrs: {}
							},
							{
								type: 'input',
								label: 'Capacidad',
								attrs: {}
							}
						]}
					/>
                    <div className="SubSection-Buttons">
						<NavLink to="/profile">
							<div className="acceptButton">
								<p>Guardar</p>
							</div>
						</NavLink>
                        <NavLink to="/profile">
							<div className="cancelButton">
								<p>Cancelar</p>
							</div>
						</NavLink>
					</div>
				</div>
			</div>
		)
	}
}

export default VehicleDetail;