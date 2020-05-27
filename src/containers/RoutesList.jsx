import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { requestRide, reviewOffers } from "services/requestRideService";
import "../assets/css/RoutesList.css";
import DropDownList from "../components/dropDownList/DropDownList";
import InputPC from "../components/inputPc/InputPC";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";

class RoutesList extends Component {
  constructor(props) {
    super(props);
    console.log("Pide Cola: " + this.props.location.state.pideCola);

    this.state = {
      user: localStorage.getItem("email"),
      direction: "",
      route: "",
      vehicle: "",
      comment: "",
    };
  }

  // Verifica si el usuario está solicitando una cola o la está ofreciendo. Da valores predeterminados a los campos
  componentDidMount() {

    reviewOffers({ email: localStorage.getItem("email") })
    .then((res) => res.json())
    .then( res => {
      // if(res && res.status && res.data.length) return this.props.history.push({ pathname: "/passengers", offers: res.data });
    })
    .catch( err => {
      console.log(err)
    })
    if(localStorage.getItem('offerActive')) return this.props.history.push({ pathname: "/waitOffer" });
    if(localStorage.getItem('rideAccept')) return this.props.history.push({ pathname: "/waitOffer", accepted: true});
    const direction = document.getElementById("direction");
    const route = document.getElementById("route");
    const vehicle = !this.props.location.state.pideCola
      ? document.getElementById("vehicle")
      : "";
    const comment = !this.props.location.state.pideCola
      ? document.getElementById("comment")
      : "";

    this.setState({
      direction: direction.value,
      route: route.value,
      vehicle: !this.props.location.state.pideCola ? vehicle.value : "",
      comment: this.props.location.state.pideCola ? comment.value : "",
    });
  }

  // Actualiza los cambios de los inputs a medida que son modificados
  handleChange = (event) => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value,
    });
  };

  // En caso de estar solicitando una cola, envía los datos de la solicitud para ser almacenados
  sendRequest = (event) => {
    event.preventDefault();
    const comment = document.getElementById("comment");
    console.log("request: ", comment.value);

    const requestBody = {
      user: this.state.user,
      startLocation:
        this.state.direction === "hacia" ? this.state.route : "USB",
      destination: this.state.direction === "hacia" ? "USB" : this.state.route,
      comment: this.state.comment,
    };
    console.log("send request body: ", requestBody);
    requestRide(requestBody)
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);
        if (response.status) {
          this.props.history.push({
            pathname: "/waitOffer",
            state: {
              user: this.state.user,
              direction: this.state.direction,
              route: this.state.route,
            },
          });
        } else {
          console.log("ERROR");
          this.props.history.push({
            pathname: "/waitOffer",
            state: {
              user: this.state.user,
              direction: this.state.direction,
              route: this.state.route,
            },
          });
        }
      })
      .catch((error) => {
        console.log("Catch", error);
      });
  };

  render() {
    return (
      <div className="offer-request-content container-fluid">
        <React.Fragment>
          <RecommendationBanner />
          {!this.props.location.state.pideCola && (
            <div className="carta">
              <DropDownList
                id="vehicle"
                onChange={this.handleChange}
                vehicleList={JSON.parse(localStorage.getItem("vehicleList"))}
              ></DropDownList>
            </div>
          )}
          <div className="carta">
            <div className="separador">
              <DropDownList
                id="direction"
                onChange={this.handleChange}
              ></DropDownList>
            </div>
            <DropDownList
              id="route"
              onChange={this.handleChange}
            ></DropDownList>
          </div>
          {this.props.location.state.pideCola && (
            <div className="Comentarios">
              <InputPC
                fields={[
                  {
                    type: "input",
                    label: "Comentarios",
                    attrs: { id: "comment", onChange: this.handleChange },
                  },
                ]}
              />
            </div>
          )}
        </React.Fragment>
        {!this.props.location.state.pideCola ? (
          <NavLink
            className="SearchButton"
            to={{
              pathname: "/passengers",
              state: {
                direction: this.state.direction,
                route: this.state.route,
                vehicle: this.state.vehicle,
              },
            }}
            // onClick={this.searchPassengers}
          >
            BUSCAR
          </NavLink>
        ) : (
          <NavLink
            className="WaitButton"
            to={{
              pathname: "/waitOffer",
              state: {
                direction: this.state.direction,
                route: this.state.route,
                comment: this.state.comment,
              },
            }}
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
