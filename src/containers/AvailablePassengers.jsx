import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getWaitingList } from "services/requestRideService";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import Passenger from "../components/passenger/Passenger";
import "../components/passenger/Passenger.css";
import Button from "../components/button/Button";
import { offerRide } from "../services/requestRideService";

class AvailablePassengers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passengers: [],
      sendingTo: []
    };
  }

  componentDidMount() {
    console.log(
      `${this.props.location.state.direction} - ${this.props.location.state.route}`
    );
    getWaitingList({ destination: this.props.location.state.route })
      .then(res => res.json())
      .then(response => {
        console.log("Response", response);
        this.setState({ passengers: response.data });
      });
  }

  passengers = list => {};

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
      this.setState(previousState => {
        return { sendingTo: [...previousState.sendingTo, email] };
      });
    }
    // Is in array
    else {
      var newArray = [...this.state.sendingTo];
      newArray.splice(inList, 1);
      this.setState(previousState => {
        return { sendingTo: newArray };
      });
    }
  };

  offerRide = event => {
    // All requests objects
    var allRequestObjects = [];

    this.state.sendingTo.map(userEmail => {
      allRequestObjects.push(
        offerRide({
          rider: localStorage.getItem("email"),
          passenger: userEmail
        })
      );
    });

    Promise.all(allRequestObjects)
      .then(allRes => {
        return Promise.all(
          allRes.map(allRes => {
            return allRes.json();
          })
        );
      })
      .then(Responses => {
        // console.log("Responses", Responses[0]);
        Responses.map(info => {
          console.log("Info", info);
        });
      })
      .catch(error => {
        console.log("ERROR in sending emails", error);
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
        <div className="sticky">
          <RecommendationBanner />
          {/*<div className="pidecola-message" text="">
          Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
        </div>*/}
          <div className="cartaInfo">
            <p>{`${
              this.props.location.state.vehicle
            } || ${this.props.location.state.direction.toUpperCase()} USB || ${this.props.location.state.route.toUpperCase()}`}</p>
          </div>
          <div className="cancelarButton">
            <NavLink to="/home">
              <p>Cancelar</p>
            </NavLink>
          </div>
          <Button className="green" text="Ofrecer" onClick={this.offerRide} />
        </div>
        <div id="listaPasajeros" className="listaPasajeros">
          {this.state.passengers.map((list, index) => {
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
