import React from "react";
import {
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import "./OfferRequestRide.css";
import RoutesList from "../routes-list/RoutesList";
import AvailablePassengers from '../availablePassengers/AvailablePassengers';

function OfferRequestRide(props) {
  let history = useHistory();
  const goTo = (opcion) => {
    if (opcion === 'pedir') {
      history.push(`${props.match.url}/pedir`);
    }
    else {
      history.push(`${props.match.url}/ofrecer`);
    }
  };
  // console.log(props);

	return (
    <div className="OfferRequestRide">
    <Switch>
      <Route exact path={`${props.match.url}`} render={props =>
        <React.Fragment>
        <div className="Recommendations"></div>
        <div className="OfferRequest">
          <button className="RequestButton" onClick={() => { goTo('pedir') }}>
            <div className="TopButton">
              <span className="TopComment">Pedir cola</span>
            </div>
            <div className="ImageRequestButton">
              <div className="OverButton">
                <span className="Comment">
                  Solicita una cola para ir a la universidad o para salir de
                  ella
                </span>
              </div>
            </div>
          </button>
          <button className="OfferButton" onClick={() => { goTo("ofrecer") }}>
            <div className="TopButton">
              <span className="TopComment">Dar cola</span>
            </div>
            <div className="ImageOfferButton">
              <div className="OverButton">
                <span className="Comment">
                  Brinda la ayuda a un compañero, profesor o empleado para ir o
                  salir de la universidad
                </span>
              </div>
            </div>
          </button>
        </div>
        <div className="RideLog" style={{ color: "white", fontWeight: "bold" }}>
          *PATROCINADORES/HISTORIAL*
        </div>
        </React.Fragment>
      } />
      <Route exact path={`${props.match.url}/:accion`} render={props => <RoutesList {...props} />} />
      <Route exact path={`${props.match.url}/:accion/pasajeros`} render={props => <AvailablePassengers {...props} />}/>
    </Switch>
    </div>
	)
}

export default OfferRequestRide
