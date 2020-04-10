import React, { Component } from "react";
import "assets/css/RateRide.css";
import like from "assets/images/like.png";
import dislike from "assets/images/dislike.png";

class RateRide extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="rateRide">
        <div className="rateMessage">
          <div className="carta" id="cartaMessage">
            ¿CÓMO CALIFICARÍAS LA COLA QUE TE DIO *NOMBRE*?
          </div>
        </div>
        <div className="rate">
          <div className="rateImages">
            <div className="like">
              <img className="likeImage" src={like} />
            </div>
            <div className="dislike">
              <img className="likeImage" src={dislike} />
            </div>
          </div>
          <div className="rateButtons">
            <div className="likeButton">
              <span>LIKE</span>
            </div>
            <div className="dislikeButton">
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
