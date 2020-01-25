import axios from 'axios'
import { general } from 'general.js'

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
  return axios.post(general.POST_LOGIN, req,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
