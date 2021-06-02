module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  devServer: {
    proxy: {
      "/auth": {
        target: "https://github.com",
        changeOrigin: true,
        pathRewrite: { "^/auth": "" },
        // headers: {
        //   Connection: "keep-alive",
        // },
      },
      "/api": {
        target: "https://api.github.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        // headers: {
        //   Connection: "keep-alive",
        // },
      },
    },
  },
};
