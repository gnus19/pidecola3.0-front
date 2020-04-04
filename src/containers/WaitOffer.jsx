import React from "react";
import "../assets/css/AvailablePassengers.css";
import RecommendationBanner from "../components/recommendationBanner/RecommendationBanner";
import { cancelRequest } from "../services/requestRideService";
import socketIOClient from 'socket.io-client';
import { SERVER } from "./global";

function WaitOffer(props) {

  // const [socket, setSocket] = useState(socketIOClient(SERVER))
  // useEffect(() => {
  //   // offeredRide chanel
  //   socket.on('offeredRide', (riderData)=> {
  //     // Sets ride and redirect to accept offer
  //   })
  //   socket.emit('')
  // });

  const cancelRideRequest = () => {
    const cancelRequestBody = {
      user: props.location.state.user,
      startLocation:
        props.location.state.direction === "hacia"
          ? props.location.state.route
          : "USB",
      destination:
        props.location.state.direction === "hacia"
          ? "USB"
          : props.location.state.route
    };
    console.log("cancel: ", cancelRequestBody);
    cancelRequest(cancelRequestBody)
      .then(res => res.json())
      .then(response => {
        console.log("Response: ", response);
        if (response.status) {
          props.history.push({
            pathname: "/home"
          });
        }

        // Emit event for canceling offer
        // socket.emit('cancelRide', cancelRequestBody);
      })
      .catch(error => {
        console.log("Catch", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="sticky">
        <RecommendationBanner />
        {/*<div className="pidecola-message" text="">
          Pide Cola USB te recuerda no utilizar tu telefono celular al conducir.
        </div>*/}
        <div className="cartaInfo">
          <p>{`${props.location.state.direction.toUpperCase()} USB || ${props.location.state.route.toUpperCase()}`}</p>
        </div>
        {/*<Button
          className="red"
          text="Cancelar"
          onClick={() => {
            console.log("Clicked");
          }}
        />*/}
        <div className="cancelarButton" onClick={cancelRideRequest}>
          Cancelar
        </div>
        <div style={{ margin: "100px" }}>
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            Espere ...
          </span>
        </div>
      </div>
    </div>
  );
}

export default WaitOffer;
