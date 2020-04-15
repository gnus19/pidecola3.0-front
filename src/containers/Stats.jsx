import React, { Component } from "react";
import {
  ridesGiven,
  ridesReceived,
  likesReceived,
  dislikesReceived,
} from "services/userServices";
import "assets/css/Stats.css";
import InputPC from "components/inputPc/InputPC";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ridesGiven: "",
      ridesReceived: "",
      likes: "",
      dislikes: "",
      prueba: false,
    };
  }

  componentDidMount() {
    ridesGiven()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        this.setState({
          ridesGiven: response.data,
        });
      })

      .catch((error) => {
        console.log("Catch", error);
      });

    ridesReceived()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        this.setState({
          ridesReceived: response.data,
        });
      })

      .catch((error) => {
        console.log("Catch", error);
      });

    likesReceived()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        this.setState({
          likes: response.data,
        });
      })

      .catch((error) => {
        console.log("Catch", error);
      });

    dislikesReceived()
      .then((res) => res.json())
      .then((response) => {
        console.log("Response: ", response);

        this.setState({
          dislikes: response.data,
        });
      })

      .catch((error) => {
        console.log("Catch", error);
      });
  }

  prueba = (event) => {
    console.log("prueba timer");
    setTimeout(
      function () {
        //Start the timer
        this.props.history.push({
          pathname: "/home",
        }); //After 1 second, set render to true
      }.bind(this),
      5000
    );
  };

  render() {
    return (
      <div className="Stats">
        <button onClick={this.prueba} />
        <InputPC
          fields={[
            {
              type: "input",
              label: "Colas recibidas",
              value: this.state.ridesReceived,
              attrs: {},
            },
          ]}
        />
        {this.state.prueba && <h1>PRUEBA</h1>}
        <InputPC
          fields={[
            {
              type: "input",
              label: "Colas dadas",
              value: this.state.ridesGiven,
              attrs: {},
            },
            {
              type: "input",
              label: "Likes",
              value: this.state.likes,
              attrs: {},
            },
            {
              type: "input",
              label: "Dislikes",
              value: this.state.dislikes,
              attrs: {},
            },
          ]}
        />
      </div>
    );
  }
}

export default Stats;
