import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { requestRide } from "services/requestRideService";
import "../assets/css/RoutesList.css";
import DropDownList from "../components/dropDownList/DropDownList";
import InputPC from "../components/inputPc/InputPC";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";

class RoutesList extends Component {
  constructor(props) {
    super(props);
    console.log("Pide Cola: " + this.props.location.state.pideCola);

    this.state = {
      user: "12-00000@usb.ve",
      direction: "",
      route: "",
      vehicle: ""
    };
  }

  componentDidMount() {
    const direction = document.getElementById("direction");
    const route = document.getElementById("route");
    const vehicle = !this.props.location.state.pideCola ? document.getElementById("vehicle"): '';
    console.log(`${route.value} - ${direction.value}`);
    this.setState({
      direction: direction.value,
      route: route.value,
      vehicle: !this.props.location.state.pideCola ? vehicle.value : ''
    });
  }

  handleChange = event => {
    const element = document.getElementById(event.target.id);
    console.log(`${event.target.id}: ${element.value}`);
    this.setState({
      [event.target.id]: element.value
    });
  };

  sendRequest = event => {
    event.preventDefault();
    const direction = document.getElementById("direction");
    const route = document.getElementById("route");

    const requestBody = {
      user: this.state.user,
      start_location:
        this.state.direction === "hacia" ? this.state.route : "USB",
      destination: this.state.direction === "hacia" ? "USB" : this.state.route,
      comment: this.state.comment
    };
    console.log("send request body: ", requestBody);
    requestRide(requestBody)
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        if (response.status) {
          this.props.history.push({ pathname: "/waitOffer", state: {direction: this.state.direction, route: this.state.route} });
        } else {
          console.log("ERROR");
        }
      })
      .catch(error => {
        console.log("Catch", error);
      });
  };

  searchPassengers = event => {
    event.preventDefault();

  }

  render() {
    return (
      <div className="offer-request-content container-fluid">
        <React.Fragment>
          {/*{this.props.recommendations && (
            <div className="Recommendations"></div>
		  )}*/}
          <RecommendationBanner />
          {/*<div className="pidecola-message" text="">
            Pide Cola USB te recuerda no utilizar tu telefono celular al
            conducir.
    </div>*/}
          { !this.props.location.state.pideCola && (
            <div className="carta">
              <DropDownList
                htmlFor="vehicle"
                id="vehicle"
                onChange={this.handleChange}
              ></DropDownList>
            </div>
          )}
          <div className="carta">
            <div className="separador">
              <DropDownList
                htmlFor="direction"
                id="direction"
                onChange={this.handleChange}
              ></DropDownList>
            </div>
            <DropDownList
              htmlFor="route"
              id="route"
              onChange={this.handleChange}
            ></DropDownList>
          </div>
          { this.props.location.state.pideCola && (
            <div className="Comentarios" id="comment">
              <InputPC
                fields={[
                  {
                    type: "input",
                    label: "Comentarios",
                    attrs: {}
                  }
                ]}
              />
            </div>
          )}
        </React.Fragment>
        { !this.props.location.state.pideCola ? (
          <NavLink
            className="SearchButton"
            to={{ pathname: "/passengers", state: {direction: this.state.direction, route: this.state.route, vehicle: this.state.vehicle} }}
            // onClick={this.searchPassengers}
          >
            BUSCAR
          </NavLink>
        ) : (
          <NavLink className="WaitButton" to={{
            pathname: "/waitOffer",
            state: {direction: this.state.direction, route: this.state.route} }}
            onClick={this.sendRequest}
          >
            SOLICITAR
          </NavLink>
        )}
      </div>
    );
  }
}

export default RoutesList;
