import { SERVER } from "../global";

export function createUser(req) {
  // return fetch('/express_backend');
  return fetch(SERVER + "/users", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function loginUser(req) {
  return fetch(SERVER + "/login", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(req.email + ":" + req.password)
    }
  });
}

export function sendCode(req) {
  return fetch(SERVER + "/users/code", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(req.email + ":" + req.password)
    }
  });
}

export function infoProfile() {
  return fetch(SERVER + "/users/view/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function editProfile(req) {
  return fetch(SERVER + "/users/update/profile", {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function editProfilePicture(req) {
  return fetch(SERVER + "/users/update/picture", {
    method: "PUT",
    body: req,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function addVehicle(req) {
  return fetch(SERVER + "/users/add/vehicle", {
    method: "PUT",
    body: req,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function deleteVehicle(req) {
  return fetch(SERVER + "/users/delete/vehicle", {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function ridesGiven() {
  return fetch(SERVER + "/statistics/rides/given", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function ridesReceived() {
  return fetch(SERVER + "/statistics/rides/received", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function likesReceived() {
  return fetch(SERVER + "/statistics/count/likes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function dislikesReceived() {
  return fetch(SERVER + "/statistics/count/dislikes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}
