import React, { Component } from "react";
import {
  ridesGiven,
  ridesReceived,
  likesReceived,
  dislikesReceived
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
      dislikes: ""
    };
  }

  componentDidMount() {
    ridesGiven()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);

        this.setState({
          ridesGiven: response.data
        });
      })

      .catch(error => {
        console.log("Catch", error);
      });

    ridesReceived()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);

        this.setState({
          ridesReceived: response.data
        });
      })

      .catch(error => {
        console.log("Catch", error);
      });

    likesReceived()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);

        this.setState({
          likes: response.data
        });
      })

      .catch(error => {
        console.log("Catch", error);
      });

    dislikesReceived()
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);

        this.setState({
          dislikes: response.data
        });
      })

      .catch(error => {
        console.log("Catch", error);
      });
  }

  render() {
    return (
      <div className="Stats">
        <InputPC
          fields={[
            {
              type: "input",
              label: "Colas dadas",
              value: this.state.ridesGiven,
              attrs: {}
            },
            {
              type: "input",
              label: "Colas recibidas",
              value: this.state.ridesReceived,
              attrs: {}
            },
            {
              type: "input",
              label: "Likes",
              value: this.state.likes,
              attrs: {}
            },
            {
              type: "input",
              label: "Dislikes",
              value: this.state.dislikes,
              attrs: {}
            }
          ]}
        />
      </div>
    );
  }
}

export default Stats;
