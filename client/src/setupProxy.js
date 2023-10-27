const { createProxyMiddleware } = require('http-proxy-middleware');

// fixing the proxy for the flask program location that is being ran
module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000/',
      changeOrigin: true,
    })
  );
};