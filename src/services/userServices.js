export function createUser(req) {
  // return fetch('/express_backend');
  return fetch("/users", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function loginUser(req) {
  return fetch("/login", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(req.email + ":" + req.password)
    }
  });
}

export function sendCode(req) {
  return fetch("users/code", {
    method: "POST",
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

export function infoProfile(req) {
  return fetch("/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkauth")
    }
  });
}
