import React, { Component } from "react";

class RecommendationBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: [
        "Recuerda no utilizar tu telefono celular al conducir.",
        "Muestra tu carnet de la universidad al momento de subirte a un auto.",
        "Mantente en la página de espera mientras te ofrecen la cola.",
        "Recuerda que PideCola USB no te asegura que siempre conseguirás una cola.",
        "Muestra tu carnet de la universidad al momento de dar la cola a alguien.",
        "Recuerda utilizar el cinturón de seguridad.",
        "Mantente en la página de pasajeros mientras los pasajeros aceptan la cola.",
      ],
      count: 0,
    };
  }

  render() {
    const { recommendations, count } = this.state;
    return (
      <div className="pidecola-message" text="">
        {recommendations[count]}
      </div>
    );
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      if (this.state.count + 1 < this.state.recommendations.length) {
        this.setState({
          count: this.state.count + 1,
        });
      } else {
        this.setState({
          count: 0,
        });
      }
    }, 7000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
}

export default RecommendationBanner;
