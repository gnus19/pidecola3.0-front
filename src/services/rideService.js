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

export function getRide(req) {
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
