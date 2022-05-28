module.exports = {
  "/api": {
    target: "http://192.168.2.3:3333",
    changeOrigin: true,
    onProxyReq: function (proxyReq, req, res) {
      proxyReq.setHeader("Cookie", req.headers.cookie);
      proxyReq.setHeader("Referer", req.headers.referer );
    }
  }
}
