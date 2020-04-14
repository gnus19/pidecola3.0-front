import React, { Component } from "react";
import "assets/css/RateRide.css";
import like from "assets/images/like.png";
import dislike from "assets/images/dislike.png";
import likeDislike from "assets/images/likeDislike.png";
import InputPC from "components/inputPc/InputPC";
import { sendFeedback, getRide } from "services/rideService";

class RateRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message:
        "¿CÓMO CALIFICARÍAS LA COLA QUE TE DIO " +
        this.props.location.state.rider.first_name.toUpperCase() +
        " " +
        this.props.location.state.rider.last_name.toUpperCase() +
        "?",
      rated: false,
      ratedImage: likeDislike,
      ratedBackground: "white",
      dislike: false,
      rideComment: " ",
    };
  }

  handleChange = (event) => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value,
    });
  };

  rateRide = (event) => {
    const rate = document.getElementById(event.target.id);
    if (rate.id === "likeButton") {
      this.setState({
        message: "¡GRACIAS POR CALIFICAR LA COLA!",
        rated: true,
        ratedImage: like,
        ratedBackground: "#4caf50",
      });
    } else {
      this.setState({
        message:
          "¡GRACIAS POR CALIFICAR LA COLA! COMENTA ABAJO POR QUÉ CONSIDERAS QUE LA COLA NO FUE BUENA.",
        rated: true,
        ratedImage: dislike,
        ratedBackground: "#d32f2f",
        dislike: true,
      });
    }
  };

  feedback = (event) => {
    if (!this.state.rated) {
      this.props.history.push({
        pathname: "/home",
      });
    } else {
      if (this.state.dislike) {
        const sendFeedbackBody = {
          rider: this.props.location.state.rider.email,
          user: localStorage.getItem("email"),
          comment: this.state.rideComment,
          like: this.state.dislike === false ? "Sí" : "No",
          startLocation: this.props.location.state.startLocation,
          destination: this.props.location.state.destination,
        };
        sendFeedback(sendFeedbackBody)
          .then((res) => res.json())
          .then((response) => {
            console.log("Response: ", response);
          })
          .catch((error) => {
            console.log("Catch", error);
          });
      } else {
        const sendFeedbackBody = {
          rider: this.props.location.state.rider.email,
          user: localStorage.getItem("email"),
          like: this.state.dislike === false ? "Sí" : "No",
          startLocation: this.props.location.state.startLocation,
          destination: this.props.location.state.destination,
        };
        sendFeedback(sendFeedbackBody)
          .then((res) => res.json())
          .then((response) => {
            console.log("Response: ", response);
          })
          .catch((error) => {
            console.log("Catch", error);
          });
      }
    }
  };

  prueba = (event) => {
    console.log("email: ", localStorage.getItem("email"));
    console.log("props: ", this.props.location.state);
  };

  render() {
    return (
      <div className="rateRide">
        <div className="rateMessage">
          <div className="carta" id="cartaMessage">
            {this.state.message}
          </div>
          <button onClick={this.prueba} />
        </div>
        <div className="rate">
          <div className="rateImages">
            <div className="rateEnvolve">
              <div
                className="showImage"
                style={{ backgroundColor: this.state.ratedBackground }}
              >
                <img className="rateImage" src={this.state.ratedImage} />
              </div>
            </div>
          </div>

          <div className="rateButtons">
            {!this.state.rated && (
              <React.Fragment>
                <div
                  className="likeButton"
                  id="likeButton"
                  onClick={this.rateRide}
                >
                  LIKE
                </div>
                <div
                  className="dislikeButton"
                  id="dislikeButton"
                  onClick={this.rateRide}
                >
                  DISLIKE
                </div>
              </React.Fragment>
            )}
            {this.state.dislike && (
              <div className="Comentarios">
                <InputPC
                  id="dislikeComment"
                  fields={[
                    {
                      type: "input",
                      label: "Comentarios",
                      attrs: { id: "rideComment", onChange: this.handleChange },
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
        <div className="finalizarRate">
          <div
            className="finalizarButton"
            id="finalizarButton"
            onClick={this.feedback}
          >
            FINALIZAR
          </div>
        </div>
      </div>
    );
  }
}

export default RateRide;
