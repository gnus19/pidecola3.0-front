import React, { Component } from "react";
import "assets/css/RateRide.css";
import like from "assets/images/like.png";
import dislike from "assets/images/dislike.png";
import likeDislike from "assets/images/likeDislike.png";
import InputPC from "components/inputPc/InputPC";
import { sendFeedback } from "services/rideService";

class RateRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message:
        "¿Cómo calificarías la cola que te dio " +
        this.props.location.state.rider.first_name +
        " " +
        this.props.location.state.rider.last_name +
        "?",
      rated: false,
      ratedImage: likeDislike,
      ratedBackground: "white",
      dislike: false,
      rideComment: " ",
      finished: false,
    };
  }

  // Actualiza los cambios del input de Comentario a medida que es modificado
  handleChange = (event) => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value,
    });
  };

  // Cambia el estado de la calificación, la imagen y muestra un mensaje acorde a la calificación
  rateRide = (event) => {
    const rate = document.getElementById(event.target.id);
    if (rate.id === "likeButton") {
      this.setState({
        message: "¡Gracias por calificar la cola!",
        rated: true,
        ratedImage: like,
        ratedBackground: "#4caf50",
      });
    } else {
      this.setState({
        message:
          "¡Gracias por calificar la cola! Comenta abajo por qué consideras que la cola no fue buena.",
        rated: true,
        ratedImage: dislike,
        ratedBackground: "#d32f2f",
        dislike: true,
      });
    }
  };

  // Envía la calificación para ser almacenada
  feedback = (event) => {
    if (!this.state.rated) {
      this.setState({
        finished: true,
      });

      setTimeout(
        function () {
          this.props.history.push({
            pathname: "/home",
          });
        }.bind(this),
        3000
      );
    } else {
      this.setState({
        finished: true,
      });

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

      setTimeout(
        function () {
          this.props.history.push({
            pathname: "/home",
          });
        }.bind(this),
        3000
      );
    }
  };

  render() {
    return (
      <div className="rateRide">
        <div className="rateMessage">
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            {this.state.message}
          </span>
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
            {!this.state.finished && !this.state.rated && (
              <React.Fragment>
                <div
                  className="likeButton"
                  id="likeButton"
                  onClick={this.rateRide}
                >
                  ¡BUENA!{" "}
                </div>
                <div
                  className="dislikeButton"
                  id="dislikeButton"
                  onClick={this.rateRide}
                >
                  MALA
                </div>
              </React.Fragment>
            )}
            {!this.state.finished && this.state.dislike && (
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
            {this.state.finished && (
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                ¡Gracias por usar PideCola 3.0!
              </span>
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
