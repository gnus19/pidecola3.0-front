export function createUser (req) {
  // return fetch('/express_backend');
  return fetch( '/users',{
    method: 'POST',
    body: JSON.stringify(req),
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

export function loginUser (req) {
  return fetch( '/login',{
    method: 'POST',
    body: JSON.stringify(req),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(req.email + ':' + req.password)
    }
  })
}
