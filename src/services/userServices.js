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
  })
}

export function loginUser (req) {
  return fetch( SERVER + '/login',{
    method: 'POST',
    body: JSON.stringify(req),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(req.email + ':' + req.password)
    }
  })
}

export function sendCode (req) {
  return fetch( SERVER + '/users/code',{
    method: 'POST',
    body: JSON.stringify(req),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(req.email + ':' + req.password)
    }
  })
}
