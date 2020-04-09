import React, { Component } from "react";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import { cancelRequest } from "../services/requestRideService";
import io from "socket.io-client";
import { SERVER } from "../global";
import AcceptOffer from "./AcceptOffer";
import Toast from "../components/toast/Toast";

class WaitOffer extends Component {
  constructor(props) {
    super(props);
    this.socket = io(SERVER);
    this.state = {
      riderInfo: null,
    };
  }

  componentDidMount() {
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
      console.log("riderOffer" + msg);
      this.setState({ riderInfo: msg });
    });
  }

  cancelRideRequest = () => {
    const cancelRequestBody = {
      user: this.props.location.state.user,
      startLocation:
        this.props.location.state.direction === "hacia"
          ? this.props.location.state.route
          : "USB",
      destination:
        this.props.location.state.direction === "hacia"
          ? "USB"
          : this.props.location.state.route,
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

  render() {
    return (
      <div className="container-fluid">
        <div className="sticky">
          <RecommendationBanner />
          <div className="cartaInfo">
            <p>{`${this.props.location.state.direction.toUpperCase()} USB || ${this.props.location.state.route.toUpperCase()}`}</p>
          </div>
          <div className="cancelarButton" onClick={this.cancelRideRequest}>
            Cancelar
          </div>
        </div>
        <Toast text="Mantente en esta página hasta que te ofrezcan cola" />
        {this.state.riderInfo ? (
          <AcceptOffer rider={this.state.riderInfo.data} />
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
    );
  }
}

export default WaitOffer;
