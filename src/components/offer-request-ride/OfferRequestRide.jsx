import React from "react";
import {
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import "./OfferRequestRide.css";
import RoutesList from "../routes-list/RoutesList";

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
        <div className="OfferRequest">
          <button className="RequestButton" onClick={() => { goTo('pedir') }}>
            <div style={{ height: '100%' }}>
              <div>
                <p>Pedir cola</p>
              </div>
              <div>
                IMagen
              </div>
            </div>
          </button>
          <button className="OfferButton" onClick={() => { goTo("ofrecer") }}>
            <div style={{ height: '100%' }}>
              <div>
                <p>Ofrecer cola</p>
              </div>
              <div>
                IMagen
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
    </Switch>
    </div>
	)
}

export default OfferRequestRide
