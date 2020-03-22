import { SERVER } from '../global'

export function createUser (req) {
  // return fetch('/express_backend');
  return fetch( SERVER + '/users',{
    method: 'POST',
    body: JSON.stringify(req),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(req.email + ':' + req.password)
    }
  });
}

export function loginUser (req) {
  return fetch( SERVER + '/login',{
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(req.email + ":" + req.password)
    }
  });
}

export function sendCode (req) {
  return fetch( SERVER + '/users/code',{
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(req.email + ":" + req.password)
    }
  });
}

export function editProfile(req) {
  return fetch("/users", {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function infoProfile() {
  return fetch("/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function editVehicle(req) {
  return fetch("/users/add/vehicle", {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}

export function infoVehicle() {
  return fetch("/users/add/vehicle", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}
