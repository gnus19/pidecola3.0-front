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
import { createNewRide, cancelOffer } from "../services/rideService";

class AvailablePassengers extends Component {
  constructor(props) {
    super(props);

    this.socket = io(global.SERVER);
    this.state = {
      passengers: [],
      sendingTo: [],
      acceptOffer: [],
      offer: "Ofrecer",
      currentVehicle: "",
      capError: false,
      confirmedPassengers: [],
      startLocation:
        this.props.history.location.state.direction === "hacia"
          ? this.props.history.location.state.route
          : "USB",
      destination:
        this.props.history.location.state.direction === "hacia"
          ? "USB"
          : this.props.history.location.state.route,
    };
  }

  // Prende los sockets para recibir la lista de pasajeros actualizada y las respuestas a las ofertas
  componentDidMount() {
    this.socket.on("connect", () => console.log("connected Scoket"));
    this.socket.on("reconnecting", (times) =>
      console.log("Reconnecting " + times)
    );

    this.socket.on("disconnect", (reason) =>
      console.log("Reconnecting " + reason)
    );

    this.socket.emit("offer", { email: localStorage.getItem("email") });

    // Passenger response
    this.socket.on("passengerResponse", (socket) => {
      console.log("passengerResponse", socket);
      const htmlElement = document.getElementById(
        socket.data.passenger.split("@")[0]
      );
      if (socket.data && socket.data.answer === "Sí") {
        // replace cheked class by accept class

        if (htmlElement && htmlElement.classList) {
          htmlElement.classList.remove("checked");
          htmlElement.classList.add("accept");
        } else {
          if (!htmlElement) return;
          htmlElement.className = htmlElement.className.replace(
            /\bchecked\b/g,
            "accept"
          );
        }
        // Remove passenger in sending to
        let index = this.state.sendingTo.indexOf(socket.data.passenger);
        console.log("Passanger index: ", index);

        let newAcceptArray = [...this.state.sendingTo];
        this.setState((previousState) => {
          return {};
        });
        newAcceptArray.splice(index, 1);
        this.setState((previousState) => {
          return {
            sendingTo: newAcceptArray,
            acceptOffer: [
              ...previousState.acceptOffer,
              previousState.sendingTo[index],
            ],
            offer: `Ofrecer`,
          };
        });
      } else {
        // Passenger respond no to the offer
        // replace cheked class by reject class
        if (htmlElement && htmlElement.classList) {
          htmlElement.classList.remove("checked");
          htmlElement.classList.add("reject");
        } else {
          if (!htmlElement) return;
          htmlElement.className = htmlElement.className.replace(
            /\bchecked\b/g,
            "reject"
          );
        }
        // Remove passenger in sending to
        let inList = this.state.sendingTo.indexOf(socket.data.passenger);
        let newArray = [...this.state.sendingTo];
        newArray.splice(inList, 1);
        this.setState((previousState) => {
          return { sendingTo: newArray };
        });
      }
    });

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
        console.log("WaitingList", response);
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

  // Select a passanger
  addPassenger = (usbid, email) => {
    var passengerCard = document.getElementById(usbid);

    // Checks if element has reject class
    if (passengerCard.className.match(/\breject\b/g)) {
      passengerCard.className = passengerCard.className.replace(
        /\breject\b/g,
        ""
      );
    }

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

  // Manda la oferta de cola a los pasajeros
  offerRide = (event) => {
    this.setState({
      capError: "",
    });

    if (
      this.state.sendingTo.length > this.state.currentVehicle.vehicle_capacity
    ) {
      this.setState({
        capError:
          "Debes seleccionar una cantidad de pasajeros menor a la máxima capacidad del vehículo.",
      });
      return;
    } else if (this.state.sendingTo.length === 0) {
      this.setState({
        capError: "Debes seleccionar al menos a una persona",
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
          car: this.props.location.state.vehicle,
          route: this.props.location.state.route,
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
        this.setState({ offer: `Ofrecer` });
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

  // Inicia la cola
  beginRide = () => {
    this.setState({ capError: "" });
    if (this.state.acceptOffer.length === 0) {
      this.setState({
        capError: "Al menos una persona debe aceptar su oferta de cola",
      });
      return;
    }

    // Crea un arreglo de arreglos de datos de los pasajeros confirmados

    let listaConfirmados = this.state.confirmedPassengers;
    this.state.acceptOffer.map((emailConfirmado) => {
      let usbidConfirmado = document.getElementById(
        emailConfirmado.split("@")[0]
      );

      let pasajeroConfirmado = {
        email: emailConfirmado,
        foto:
          usbidConfirmado.children[0].children[0].children[0].children[0].src,
        nombre: usbidConfirmado.children[1].innerHTML,
        cohorte: usbidConfirmado.children[2].children[0].innerHTML,
        telefono: usbidConfirmado.children[3].children[0].innerHTML,
        carrera: usbidConfirmado.children[4].children[0].innerHTML,
        ruta: usbidConfirmado.children[5].children[0].innerHTML,
        comentario: usbidConfirmado.children[6].children[0].innerHTML,
      };

      listaConfirmados.push(pasajeroConfirmado);
    });

    this.setState({
      confirmedPassengers: listaConfirmados,
    });

    // Creating new Ride

    let requestBody = {
      rider: localStorage.getItem("email"),
      passenger: this.state.confirmedPassengers,
      seats: this.state.currentVehicle.vehicle_capacity,
      startLocation:
        this.props.location.state.direction === "hacia"
          ? this.props.location.state.route
          : "USB",
      destination:
        this.props.location.state.direction === "hacia"
          ? "USB"
          : this.props.location.state.route,
      vehicleId: this.state.currentVehicle._id,
    };

    createNewRide(requestBody)
      .then((res) => res.json())
      .then((response) => {
        console.log("new ride: ", response);

        this.props.history.push({
          pathname: "/rideProcess",
          state: {
            rideInfo: response,
            confirmedPassengers: this.state.confirmedPassengers,
          },
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({ capError: "Intente mas tarde" });
      });
  };

  handleCancelOffer = () => {
    if(this.state.sendingTo || this.state.sendingTo.length) cancelOffer(localStorage.getItem("email"), this.state.sendingTo)
    return this.props.history.push({pathname: "/home"})
  }

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
            <div className="responseProfileError">{this.state.capError}</div>
          )}
          {/* <button onClick={() => { this.socket.emit('offer', {email: localStorage.getItem('email')}) ; console.log("Emited");}}>Emit</button> */}
          <div className="cancelarButton" onClick = { this.handleCancelOffer}>
            {/* <NavLink to="/home"> */}
              <p>Cancelar</p>
            {/* </NavLink> */}
          </div>
          <div className="begin-offer-content">
            <div
              className="ofrecerButton"
              text="Ofrecer"
              onClick={this.offerRide}
            >
              {this.state.offer}
            </div>
            <div
              className="ofrecerButton"
              id="iniciarButton"
              text="Iniciar"
              onClick={this.beginRide}
            >
              Iniciar cola
            </div>
          </div>
        </div>
        <div id="listaPasajeros" className="listaPasajeros">
          {this.state.passengers.map((list) => {
            return list.requests.map((passenger, passengerIndex) => {
              return (
                (this.state.startLocation === "USB" &&
                  passenger.startLocation === "USB" && (
                    <Passenger
                      foto={passenger.user.prPic}
                      nombre={passenger.user.fName + " " + passenger.user.lName}
                      carrera={passenger.user.major}
                      cohorte={passenger.user.usbid.split("-")[0]}
                      ruta={list.name}
                      usbid={passenger.user.usbid}
                      telefono={passenger.user.phone}
                      comentario={passenger.comment}
                      onClick={() => {
                        this.addPassenger(
                          passenger.user.usbid,
                          passenger.email
                        );
                      }}
                      key={passengerIndex}
                    />
                  )) ||
                (this.state.destination === "USB" &&
                  passenger.destination === "USB" && (
                    <Passenger
                      foto={passenger.user.prPic}
                      nombre={passenger.user.fName + " " + passenger.user.lName}
                      carrera={passenger.user.major}
                      cohorte={passenger.user.usbid.split("-")[0]}
                      ruta={list.name}
                      usbid={passenger.user.usbid}
                      telefono={passenger.user.phone}
                      comentario={passenger.comment}
                      onClick={() => {
                        this.addPassenger(
                          passenger.user.usbid,
                          passenger.email
                        );
                      }}
                      key={passengerIndex}
                    />
                  ))
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default AvailablePassengers;
