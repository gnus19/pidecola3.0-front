import React, { Component } from "react";
import "../assets/css/WaitOffer.css";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import { cancelRequest } from "../services/requestRideService";
import { getRequest } from "services/userServices";
import { respondOfferRide } from "../services/requestRideService";
import io from "socket.io-client";
import { SERVER } from "../global";
import AcceptOffer from "./AcceptOffer";
import Toast from "../components/toast/toast";

class WaitOffer extends Component {
  constructor(props) {
    super(props);
    this.socket = io(SERVER);
    this.rejectRider = this.rejectRider.bind(this);
    this.state = {
      riderInfo: null,
      direction: "",
      route: "",
    };
  }

  // Prende los sockets para recibir las ofertas de cola
  componentDidMount() {
    getRequest()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        if (response.message !== "No existe") {
          console.log("status: ", response.status);
          this.setState({
            activeRide: true,
            direction:
              response.data.startLocation === "USB" ? "desde" : "hacia",
            route:
              response.data.destination === "USB"
                ? response.data.startLocation
                : response.data.destination,
          });
        }
      });

    // if (socket && !socket.connected) socket.connect();
    this.socket.on("connect", () => console.log("connected Scoket"));
    this.socket.on("reconnecting", (times) =>
      console.log("Reconnecting" + times)
    );
    this.socket.on("disconnect", (reason) =>
      console.log("Reconnecting" + reason)
    );

    this.socket.emit("offer", { email: localStorage.getItem("email") });

    this.socket.on("rideOffer", (msg) => {
      console.log("riderOffer", msg);
      this.setState({ riderInfo: msg });
    });
  }

  // Cancela la oferta de cola
  cancelRideRequest = () => {
    const containerFluidAccept = document.getElementById(
      "containerFluidAccept"
    );

    if (containerFluidAccept !== null) {
      let requestBody = {
        rider: this.state.riderInfo.data.email,
        passenger: localStorage.getItem("email"),
        accept: "No",
      };
      respondOfferRide(requestBody)
        .then((res) => {
          res.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error sending offer anwser", error);
        });
    }

    const cancelRequestBody = {
      user: localStorage.getItem("email"),
      startLocation:
        this.state.direction === "hacia" ? this.state.route : "USB",
      destination: this.state.direction === "hacia" ? "USB" : this.state.route,
    };
    console.log("cancel: ", cancelRequestBody);
    cancelRequest(cancelRequestBody)
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);
        if (response.status) {
          this.props.history.push({
            pathname: "/home",
          });
        }

        // Emit event for canceling offer
        // socket.emit('cancelRide', cancelRequestBody);
      })
      .catch((error) => {
        console.log("Catch", error);
      });
  };

  rejectRider() {
    this.setState({ riderInfo: null });
  }

  prueba = (event) => {
    console.log("state: ", this.state);
    console.log("props: ", this.props);
  };

  render() {
    return (
      <div className="waitOffer">
        <div className="container-fluid">
          <div className="sticky">
            <button onClick={this.prueba} />
            <RecommendationBanner />
            <div className="cartaInfo">
              <p>{`${this.state.direction.toUpperCase()} USB || ${this.state.route.toUpperCase()}`}</p>
            </div>
            <div className="cancelarButton" onClick={this.cancelRideRequest}>
              Cancelar
            </div>
          </div>
          <Toast text="Mantente en esta página hasta que te ofrezcan cola" />
          {this.state.riderInfo ? (
            <AcceptOffer
              rider={this.state.riderInfo.data}
              rejectRider={this.rejectRider}
              {...this.props}
            />
          ) : (
            <div className="sticky">
              <div style={{ margin: "50px" }}>
                <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Espera que un conductor te ofrezca la cola
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WaitOffer;
