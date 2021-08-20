const axios = require('axios');

const _axios = axios.create({
  baseURL: "http://newshopapi.0melon0.cn/",
  timeout: 3000
})


_axios.interceptors.request.use(function (config) {
  if (sessionStorage.getItem("token")) {
    config.headers["x-token"] = sessionStorage.getItem("token")
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
module.exports = _axios;