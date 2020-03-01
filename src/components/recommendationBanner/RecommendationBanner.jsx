import React, { Component } from "react";

class RecommendationBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: [
        "Recuerda no utilizar tu telefono celular al conducir.",
        "Muestra tu carnet de la universidad al momento de subirte a un auto.",
        "Recuerda que PideCola USB no te asegura que siempre conseguirás una cola.",
        "Muestra tu carnet de la universidad al momento de dar la cola a alguien.",
        "Recuerda utilizar el cinturón de seguridad."
      ],
      count: 0
    };
  }

  render() {
    const { recommendations, count } = this.state;
    return (
      <div className="pidecola-message" text="">
        {/*Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.*/}
        {recommendations[count]}
      </div>
    );
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      if (this.state.count + 1 < this.state.recommendations.length) {
        console.log("PRUEBA 1");
        this.setState({
          count: this.state.count + 1
        });
      } else {
        console.log("PRUEBA 2");
        this.setState({
          count: 0
        });
      }
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
}

export default RecommendationBanner;
