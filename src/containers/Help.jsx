import React, { Component } from "react";
import "assets/css/Help.css";
import twitter from "assets/images/twitter.png";
import instagram from "assets/images/instagram.png";
import telegram from "assets/images/telegram.png";

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goTo = event => {
    event.preventDefault();
    const id = event.target.id;
    if (id === "twitter") {
      window.open("https://twitter.com/FCEUSB");
    } else if (id === "instagram") {
      console.log("prueba");
      window.open("https://instagram.com/fceusb?igshid=iy31u23evlek");
    } else if (id === "telegram") {
      window.open("https://t.me/FCEUSB");
    } else {
    }
  };

  render() {
    return (
      <div className="Help">
        <div className="Terminos">
          <div className="cartaAyuda" id="cartaTerminos"></div>
        </div>
        <div className="Personal">
          <div className="cartaAyuda" id="cartaPersonal"></div>
        </div>
        <div className="Links">
          <div className="cartaAyuda" id="cartaLinks">
            <img
              className="logoImage"
              id="twitter"
              src={twitter}
              onClick={this.goTo}
              alt='twitter'
              />
            <img
              className="logoImage"
              id="instagram"
              src={instagram}
              onClick={this.goTo}
              alt='instagram'
              />
            <img
              className="logoImage"
              id="telegram"
              src={telegram}
              onClick={this.goTo}
              alt='telegram'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
