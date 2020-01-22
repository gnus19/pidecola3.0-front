require('dotenv').config()

const server = 'http://localhost/2222'
console.log(server)
export const general = {
  SERVER_NAME: server,

  HEADERS: {
    Authorization: 'Bearer ' + localStorage.getItem('pctoken'),
    'Content-Type': 'application/json'
  },

  // Users Routes
  POST_USER: `${server}/users`,
  POST_LOGIN: `${server}/login`
}
