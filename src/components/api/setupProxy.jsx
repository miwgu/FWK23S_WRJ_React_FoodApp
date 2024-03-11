const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.themealdb.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove the '/api' prefix when forwarding the request
      },
    })
  );
};
