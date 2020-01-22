import axios from 'axios'
import { general } from 'general.js'

export function createUser (req) {
  console.log(general.POST_USER)
  return axios.post(general.POST_USER, req,
    {
      headers:
        { 'Content-Type': 'application/json' }
    })
}
