import { SERVER } from "../global";

export function createNewRide(req) {
  return fetch(SERVER + "/rides/create", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth"),
    },
  });
}

export function getRide() {
  return fetch(SERVER + "/rides/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth"),
    },
  });
}

export function changeStatus(req) {
  return fetch(SERVER + "/rides/changeStatus", {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth"),
    },
  });
}

export function endRide(req) {
  return fetch(SERVER + "/rides/endRide", {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth"),
    },
  });
}

export function sendFeedback(req) {
  return fetch(SERVER + "/rides/commentARide", {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth"),
    },
  });
}

export function cancelOffer(rider, passengers){
  return fetch(SERVER + "/rides/cancel", {
    method: "POST",
    body: JSON.stringify({rider: rider, passengers: passengers}),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth"),
    },
  });
}
