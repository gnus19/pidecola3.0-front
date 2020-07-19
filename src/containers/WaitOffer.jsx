import React, { Component } from "react";
import "../assets/css/WaitOffer.css";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import { cancelRequest, offerRide } from "../services/requestRideService";
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
      riderInfo: [],
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
            direction:
              response.data.startLocation === "USB" ? "desde" : "hacia",
            route:
              response.data.destination === "USB"
                ? response.data.startLocation
                : response.data.destination,
          });
        }
      });

    if (this.props.history.location.state !== undefined) {
      if (this.props.history.location.state.activeRide) {
        let offers = [...this.state.riderInfo];
        this.setState({
          riderInfo: [this.props.history.location.state.riderInfo],
          direction: this.props.history.location.state.riderInfo.direction,
          route: this.props.history.location.state.riderInfo.route,
        });
      }
    }

    // if (socket && !socket.connected) socket.connect();
    this.socket.on("connect", () => console.log("connected Scoket"));
    this.socket.on("reconnecting", (times) =>
      console.log("Reconnecting" + times)
    );
    this.socket.on("disconnect", (reason) =>
      console.log("Reconnecting" + reason)
    );

    this.socket.emit("request", { email: localStorage.getItem("email") });

    // New rider socket
    this.socket.on("rideOffer", (msg) => {
      console.log("riderOffer", msg);
      localStorage.setItem('offerActive', 'true')
      let rideroffers = [...this.state.riderInfo, msg.data];
      this.setState({ riderInfo: rideroffers });
    });

    this.socket.on("offerCancel", (msg) => {
      console.log("offerCancel", msg);
      localStorage.removeItem('offerActive')
      // this.setState({ riderInfo: null });
    });
    console.log('Rider Info:', this.state.riderInfo);
    
  }

  // Cancela la oferta de cola
  cancelRideRequest = () => {
    const containerFluidAccept = document.getElementById(
      "containerFluidAccept"
    );

    if (containerFluidAccept !== null) {
      let offers = this.state.riderInfo;
      let offersResponds = []
      // Rejecting no to al others riders
      offers.forEach((rider) => {
        offersResponds.push(
          respondOfferRide({
            rider: rider.email,
            passenger: localStorage.getItem("email"),
            accept: 'No'
          })
        )
      })
      Promise.all(offersResponds)
      .then((allRes) => {
        return Promise.all(
          allRes.map((allRes) => {
            return allRes.json();
          })
        );
      })
      .then((responses) => {
  
      })
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
        localStorage.removeItem('offerActive')
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

  // Rejects riderEmail offer
  rejectRider = (riderEmail) => {
    let offers = this.state.riderInfo;
    let oldIndex = this.state.riderInfo.findIndex((element) => { return riderEmail === element.email });
    offers.splice(oldIndex, 1);
    this.setState({ riderInfo: offers });
  }

  // Rejects all other riders except riderEmail
  rejectAllOtherRiders = (riderEmail) => {
    // Removing accepted rider
    let offers = this.state.riderInfo;
    let oldIndex = this.state.riderInfo.findIndex((element) => { return riderEmail === element.email });
    let acceptedRider = this.state.riderInfo[oldIndex];
    offers.splice(oldIndex, 1);
    this.setState({riderInfo: [acceptedRider]});

    let offersResponds = []
    // Rejecting no to al others riders
    offers.forEach((rider) => {
      offersResponds.push(
        respondOfferRide({
          rider: rider.email,
          passenger: localStorage.getItem("email"),
          accept: 'No'
        })
      )
    })
    Promise.all(offersResponds)
    .then((allRes) => {
      return Promise.all(
        allRes.map((allRes) => {
          return allRes.json();
        })
      );
    })
    .then((responses) => {

    })

  }

  render() {
    return (
      <div className="waitOffer">
        <div className="container-fluid">
          <div className="sticky">
            <RecommendationBanner />
            <div className="cartaInfo">
              <p>{`${this.state.direction.toUpperCase()} USB || ${this.state.route.toUpperCase()}`}</p>
            </div>
            <div
              className="cancelarButton"
              id="cancelRequestButton"
              onClick={this.cancelRideRequest}
            >
              Cancelar
            </div>
          </div>
          <Toast text="Mantente en esta página hasta que te ofrezcan cola" />
          {this.state.riderInfo && this.state.riderInfo.length > 0 ?
          this.state.riderInfo.map((riderInfo) => {
            return <AcceptOffer
              rider={riderInfo}
              rejectRider={this.rejectRider}
              rejectAllOtherRiders={this.rejectAllOtherRiders}
              socket={this.socket}
              {...this.props}
            />
          })

           : (
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
