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

  goTo = (event) => {
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
        <div className="FAQs">
          <div className="cartaAyuda" id="cartaFAQs">
            <div className="helpTop" id="faqsTop">
              <span className="topText">FAQs</span>
            </div>
            <div className="faqsContent">
              <span className="infoAyuda">
                ¿PideCola 3.0 me asegura conseguir una cola?
              </span>
              <span className="infoAyuda" id="faqsRespuesta">
                *RESPUESTA*
              </span>
              <span className="infoAyuda">¿Cómo pedir/dar la cola?</span>
              <span className="infoAyuda" id="faqsRespuesta">
                *RESPUESTA*
              </span>
              <span className="infoAyuda">
                ¿Qué hacer una vez que termine la cola?
              </span>
              <span className="infoAyuda" id="faqsRespuesta">
                *RESPUESTA*
              </span>
              <span className="infoAyuda">
                ¿Qué hacer si ocurre un accidente en el transcurso de la cola?
              </span>
              <span className="infoAyuda" id="faqsRespuesta">
                *RESPUESTA*
              </span>
              <span className="infoAyuda">
                ¿Qué hacer si PideCola 3.0 no funciona correctamente?
              </span>
              <span className="infoAyuda" id="faqsRespuesta">
                *RESPUESTA*
              </span>
            </div>
          </div>
        </div>
        <div className="Personal">
          <div className="cartaAyuda" id="cartaDevTeam">
            <div className="helpTop">
              <span className="topText">EQUIPO DE DESARROLLO</span>
            </div>
            <div className="personalContent">
              <div className="team" id="devTeam">
                <span className="infoAyuda">- ANDRÉ CORCUERA</span>
                <span className="infoAyuda">- PEDRO MALDONADO</span>
                <span className="infoAyuda">- FRANCISCO MÁRQUEZ</span>
              </div>
              <div className="team" id="devTeam">
                <span className="infoAyuda">- ÁNGEL MORANTE</span>
                <span className="infoAyuda">- JAVIER VIVAS</span>
              </div>
            </div>
          </div>
          <div className="cartaAyuda" id="cartaSupervisor">
            <div className="helpTop">
              <span className="topText">SUPERVISOR</span>
            </div>
            <div className="personalContent">
              <div className="team" id="supervTeam">
                <span className="infoAyuda">PROF. FERNANDO TORRE MORA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="Links">
          <div className="cartaAyuda" id="cartaLinks">
            <div className="helpTop">
              <span className="topText">SIGUE A LA FCE EN SUS REDES</span>
            </div>
            <div className="linkLogos">
              <img
                className="logoImage"
                id="twitter"
                src={twitter}
                onClick={this.goTo}
                alt="twitter"
              />
              <img
                className="logoImage"
                id="instagram"
                src={instagram}
                onClick={this.goTo}
                alt="instagram"
              />
              <img
                className="logoImage"
                id="telegram"
                src={telegram}
                onClick={this.goTo}
                alt="telegram"
              />
            </div>
          </div>
          <div className="cartaAyuda" id="cartaContacto">
            <div className="helpTop">
              <span className="topText">CONTACTO</span>
            </div>
            <div className="contactoContent">
              <div className="datos">
                <span className="infoAyuda">NÚMERO - </span>
              </div>
              <div className="datos">
                <span className="infoAyuda">CORREO - FCEUSB@USB.VE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
