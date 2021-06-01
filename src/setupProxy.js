const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/auth", {
      target: "https://github.com",
      changeOrigin: true,
      pathRewrite: { "^/auth": "" },
      //   headers: {
      //     Connection: "keep-alive",
      //   },
    })
  );
  app.use(
    createProxyMiddleware("/api", {
      target: "https://api.github.com",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      //   headers: {
      //     Connection: "keep-alive",
      //   },
    })
  );
};
