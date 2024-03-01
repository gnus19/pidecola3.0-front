const jwt = require("jsonwebtoken");
const API_SECRET = process.env.API_SECRET;
const AUDIENCE = process.env.AUDIENCE;

export default function getApiToken() {
  return jwt.sign({ iss: "client", aud: AUDIENCE }, API_SECRET);
}
