import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getWaitingList } from "services/requestRideService";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import io from "socket.io-client";
import global from "../global";
import { offerRide } from "../services/requestRideService";
import Toast from "../components/toast/toast";

class AvailablePassengers extends Component {
  constructor(props) {
    super(props);

    this.socket = io(global.SERVER);
    this.state = {
      passengers: [],
      sendingTo: [],
      offer: "Ofrecer",
      currentVehicle: "",
      capError: false,
    };
  }

  componentDidMount() {
    this.socket.on("connect", () => console.log("connected Scoket"));
    this.socket.on("reconnecting", (times) =>
      console.log("Reconnecting " + times)
    );
    this.socket.on("disconnect", (reason) =>
      console.log("Reconnecting " + reason)
    );

    this.socket.emit("offer", { email: localStorage.getItem("email") });

    this.socket.on("passengers", (msg) => {
      console.log("Passenger from socket: ", msg);
      console.log(this.state);
      if (msg.status) this.setState({ passengers: msg.data });
      console.log(this.state);
    });

    console.log(
      `${this.props.location.state.direction} - ${this.props.location.state.route}`
    );

    getWaitingList({ destination: this.props.location.state.route })
      .then((res) => res.json())
      .then((response) => {
        console.log("Response", response);
        this.setState({ passengers: response.data });
      });

    var vehicleList = JSON.parse(localStorage.getItem("vehicleList"));
    vehicleList.map((vehicle) => {
      if (vehicle.plate === this.props.location.state.vehicle) {
        this.setState({
          currentVehicle: vehicle,
        });
      }
    });
  }

  passengers = (list) => {};

  prueba = (usbid, email) => {
    var passengerCard = document.getElementById(usbid);

    // Changes background color
    if (passengerCard.classList) {
      passengerCard.classList.toggle("checked");
    } else {
      var classes = passengerCard.className.split(" ");
      var index = classes.indexOf("checked");

      if (index >= 0) classes.splice(index, 1);
      else classes.push("checked");
      passengerCard.className = classes.join(" ");
    }

    // Add/Remove passenger to list
    var inList = this.state.sendingTo.indexOf(email);
    // Is not in array
    if (inList < 0) {
      this.setState((previousState) => {
        return { sendingTo: [...previousState.sendingTo, email] };
      });
    }
    // Is in array
    else {
      var newArray = [...this.state.sendingTo];
      newArray.splice(inList, 1);
      this.setState((previousState) => {
        return { sendingTo: newArray };
      });
    }
  };

  offerRide = (event) => {
    this.setState({
      capError: false,
    });

    if (
      this.state.sendingTo.length > this.state.currentVehicle.vehicle_capacity
    ) {
      this.setState({
        capError: true,
      });
      return;
    }

    // All requests objects
    this.setState({ offer: "Espere..." });
    var allRequestObjects = [];

    this.state.sendingTo.forEach((userEmail) => {
      allRequestObjects.push(
        offerRide({
          rider: localStorage.getItem("email"),
          passenger: userEmail,
        })
      );
    });

    Promise.all(allRequestObjects)
      .then((allRes) => {
        return Promise.all(
          allRes.map((allRes) => {
            return allRes.json();
          })
        );
      })
      .then((Responses) => {
        // console.log("Responses", Responses[0]);
        Responses.forEach((info) => {
          console.log("Info", info);
        });
        this.setState({ offer: "Ofrecer" });
        console.log("state: ", this.state);
      })
      .catch((error) => {
        console.log("ERROR in sending emails", error);
        this.setState({ offer: "Ofrecer" });
      });

    // One by one

    // this.state.sendingTo.map((userEmail) => {
    //   var ride = { rider: localStorage.getItem("email"), passenger: userEmail };
    //   offerRide(ride)
    //   .then(res => res.json())
    //   .then(
    //     response => {
    //       console.log("RIDE RESPONSE: ", response);
    //     }
    //   )
    // })
  };

  render() {
    return (
      <div className="container-fluid">
        <Toast text="Mantente en esta página hasta que acepten la cola." />
        <div className="sticky">
          <RecommendationBanner />
          <div className="cartaInfo">
            <p>{`${
              this.props.location.state.vehicle
            } || ${this.props.location.state.direction.toUpperCase()} USB || ${this.props.location.state.route.toUpperCase()}`}</p>
          </div>
          {this.state.capError && (
            <div className="responseProfileError">
              Debes seleccionar una cantidad de pasajeros menor a la máxima
              capacidad del vehículo.
            </div>
          )}
          {/* <button onClick={() => { this.socket.emit('offer', {email: localStorage.getItem('email')}) ; console.log("Emited");}}>Emit</button> */}
          <div className="cancelarButton">
            <NavLink to="/home">
              <p>Cancelar</p>
            </NavLink>
          </div>
          <div
            className="ofrecerButton"
            text={this.state.offer}
            onClick={this.offerRide}
          >
            <p>Ofrecer</p>
          </div>
        </div>
        <div id="listaPasajeros" className="listaPasajeros">
          {this.state.passengers.map((list) => {
            return list.requests.map((passenger, passengerIndex) => {
              return (
                <Passenger
                  foto={passenger.user.prPic}
                  nombre={passenger.user.fName + " " + passenger.user.lName}
                  carrera={passenger.user.major}
                  cohorte={passenger.user.usbid.split("-")[0]}
                  ruta={list.name}
                  usbid={passenger.user.usbid}
                  comentario={passenger.comment}
                  onClick={() => {
                    this.prueba(passenger.user.usbid, passenger.email);
                  }}
                  key={passengerIndex}
                />
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default AvailablePassengers;
