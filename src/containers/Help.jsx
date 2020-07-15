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

  // Abre una pestaña nueva con dirección URL en base a la imagen a la que se le dio click
  goTo = (event) => {
    event.preventDefault();
    const id = event.target.id;
    if (id === "twitter") {
      window.open("https://twitter.com/FCEUSB");
    } else if (id === "instagram") {
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
                ¿PideCola me asegura conseguir un traslado desde/hacia la USB?
              </span>
              <span className="infoAyuda" id="faqsRespuesta">
                No, PideCola 3.0 no se hace responsable de asegurar una cola a
                sus usuarios, solo se asegura de establecer un canal de
                integración y comunicación entre la comunidad universitaria para
                llegar y salir de la USB.
              </span>
              <span className="infoAyuda">¿Cómo pedir/dar la cola?</span>
              <span className="infoAyuda" id="faqsRespuesta">
                En la sección de Inicio, seleccionar la tarjeta correspondiente
                para Pedir/Dar cola, luego, seleccionar los datos de la ruta.
                Como conductor, debe indicar el vehículo que usará. Como
                pasajero, tiene la opción de hacer un comentario que considere
                relevante.
              </span>
              <span className="infoAyuda">
                ¿Qué hacer una vez que termine la cola?
              </span>
              <span className="infoAyuda" id="faqsRespuesta">
                Como conductor, debe indicar la finalización con el botón de
                "Finalizada", luego la aplicación automáticamente lo llevará al
                Inicio. Como pasajero, se le presenta la posibilidad de
                calificar la cola, así como dejar un comentario.
              </span>
              <span className="infoAyuda">
                ¿Qué hacer si ocurre un accidente en el transcurso de la cola?
              </span>
              <span className="infoAyuda" id="faqsRespuesta">
                Como conductor, si los pasajeros aún no están en el vehículo, se
                debe presionar el botón de "Accidentado" para hacerles saber que
                ocurrió algo, así como notificarles vía celular. Luego de llegar
                a un acuerdo con los pasajeros, si el problema no puede
                solucionarse, el conductor debe finalizar la cola para que los
                pasajeros puedan solicitar otra, si así lo desean. En caso de
                alguna emergencia, se puede contactar a la FCE por las distintas
                vías proporcionadas.
              </span>
              <span className="infoAyuda">
                ¿Qué hacer si PideCola 3.0 no funciona correctamente?
              </span>
              <span className="infoAyuda" id="faqsRespuesta">
                Notificar a la FCE mediante las vías proporcionadas y explicar
                detalladamente la situación.
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
                <span className="infoAyuda">NÚMERO - (0212) 9063020</span>
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
