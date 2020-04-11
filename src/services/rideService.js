import { SERVER } from "../global";

export function createNewRide(req) {
  return fetch(SERVER + "/rides/create", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}