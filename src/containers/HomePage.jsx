import React, { Component } from "react";
import "assets/css/HomePage.css";
import OfferRequestRide from "./offer-request-ride/OfferRequestRide";

class HomePage extends Component {
  render() {
    return (
      <OfferRequestRide {...this.props}/>
    );
  }
}

export default HomePage;
