import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import "./OfferRequestRide.css";
import routesList from "../routes-list/routesList";

class OfferRequestRide extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  

  render() {
    console.log(this.props.match.url);
    
    return (
      <div className="OfferRequestRide">
        <div className="OfferRequest">
          <button className="RequestButton">
            <Link to={`${this.props.match.url}/routes`}>
              <div>
                <p>Titulo</p>
              </div>
              <div>
                IMagen
              </div>
            </Link>
          </button>
          <button className="OfferButton">
            <div>
              <p>Titulo</p>
            </div>
            <div>
              IMagen
            </div>
          </button>
        </div>
        <div className="RideLog" style={{ color: "white", fontWeight: "bold" }}>
          *PATROCINADORES/HISTORIAL*
        </div>
      </div>
    );
  }
}

export default OfferRequestRide;
