import React, { Component } from "react";
import "assets/css/RateRide.css";
import like from "assets/images/like.png";
import dislike from "assets/images/dislike.png";

class RateRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rated: false,
      likeHovered: false,
      dislikeHovered: false,
    };
  }

  onMouseEnterLike = (event) => {
    this.setState({
      likeHovered: true,
    });
  };

  onMouseLeaveLike = (event) => {
    this.setState({
      likeHovered: false,
    });
  };

  onMouseEnterDislike = (event) => {
    this.setState({
      dislikeHovered: true,
    });
  };

  onMouseLeaveDislike = (event) => {
    this.setState({
      dislikeHovered: false,
    });
  };

  rateRide = (event) => {
    this.setState({
      rated: true,
    });
  };

  render() {
    const { likeHovered } = this.state;
    const likeStyle = likeHovered ? { backgroundColor: "#4caf50" } : {};
    const { dislikeHovered } = this.state;
    const dislikeStyle = dislikeHovered ? { backgroundColor: "#d32f2f" } : {};
    return (
      <div className="rateRide">
        <div className="rateMessage">
          {!this.state.rated ? (
            <div className="carta" id="cartaMessage">
              ¿CÓMO CALIFICARÍAS LA COLA QUE TE DIO *NOMBRE*?
            </div>
          ) : (
            <div className="carta" id="cartaMessage">
              ¡GRACIAS POR CALIFICAR LA COLA!
            </div>
          )}
        </div>
        <div className="rate">
          <div className="rateImages">
            <div className="like" style={likeStyle}>
              <img className="rateImage" src={like} />
            </div>
            <div className="dislike" style={dislikeStyle}>
              <img className="rateImage" src={dislike} />
            </div>
          </div>
          <div className="rateButtons">
            <div
              className="likeButton"
              onMouseEnter={this.onMouseEnterLike}
              onMouseLeave={this.onMouseLeaveLike}
              onClick={this.rateRide}
            >
              <span>LIKE</span>
            </div>
            <div
              className="dislikeButton"
              onMouseEnter={this.onMouseEnterDislike}
              onMouseLeave={this.onMouseLeaveDislike}
              onClick={this.rateRide}
            >
              <span>DISLIKE</span>
            </div>
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
