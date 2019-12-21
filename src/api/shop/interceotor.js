import axios from 'axios';

//创建axios实例
const axiosObj = axios.create({
  // baseURL:"http://localhost:4000",
  timeout:15000
})

//配置拦截器


axiosObj.interceptors.request.use(function(config){
  // params不值得去封装
  if(config.url === "/4000/position"){
    config.url = `${config.url}/${config.params.latitude},${config.params.longitude}`
    config.params = {}
  }

  
  return config;
},function (error) {
  return Promise.reject(error);
});

axiosObj.interceptors.response.use(function (response) {
  return response.data;
},function (error) {
  return Promise.reject(error)
});

export default axiosObj