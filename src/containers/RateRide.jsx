import React, { Component } from "react";
import "assets/css/RateRide.css";
import like from "assets/images/like.png";
import dislike from "assets/images/dislike.png";
import likeDislike from "assets/images/likeDislike.png";
import InputPC from "components/inputPc/InputPC";

class RateRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "¿CÓMO CALIFICARÍAS LA COLA QUE TE DIO *NOMBRE*?",
      rated: false,
      ratedImage: likeDislike,
      ratedBackground: "white",
      dislike: false,
    };
  }

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
          "¡GRACIAS POR CALIFICAR LA COLA! COMENTA ABAJO POR QUÉ CONSIDERAS QUE LA COLA FUE MALA.",
        rated: true,
        ratedImage: dislike,
        ratedBackground: "#d32f2f",
        dislike: true,
        rideComment: "",
      });
    }
  };

  handleChange = (event) => {
    const element = document.getElementById(event.target.id);
    this.setState({
      [event.target.id]: element.value,
    });
  };

  render() {
    return (
      <div className="rateRide">
        <div className="rateMessage">
          <div className="carta" id="cartaMessage">
            {this.state.message}
          </div>
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
          <div className="finalizarButton" id="finalizarButton">
            <span>FINALIZAR</span>
          </div>
        </div>
      </div>
    );
  }
}

export default RateRide;
