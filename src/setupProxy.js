const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(createProxyMiddleware("/*", { target: "https://pidecolausb.herokuapp.com/" }))
}