import { SERVER } from "../global";

export function requestRide(req) {
  return fetch(SERVER + "/requests/create", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function cancelRequest(req) {
  return fetch(SERVER + "/requests/cancel", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function getWaitingList(req) {
  return fetch(SERVER + "/recommend", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function offerRide(req) {
  return fetch(SERVER + "/requests/offerRide", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function respondOfferRide(req) {
  return fetch(SERVER + "/requests/respondOfferRide", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}
