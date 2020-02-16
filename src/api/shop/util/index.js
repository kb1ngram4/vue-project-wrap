export default (axiosInstance,interfaceObj)=>{
  const api = {};
  //遍历接口对象中的请求方法
  //name是方法名
  for(name in interfaceObj){
    console.log(name);
    
    const {url,method,isForm,corsUrl} = interfaceObj[name];
    api[name] = async (data,config={})=>{
      //数据转换，将传入的js对象，按需求转换为data(json/formdata)或者params
      let transformData = null;
      if(data && isForm){
        transformData = new FormData();
        for(let key in data){
          transformData.append(key,data[key])
        }
      }else{
        transformData = data
      }

      //凡是有corsUrl的都需要跨域   解决跨域
      if(corsUrl){
        url = corsUrl +  url
        corsUrl = ""
      }

      

      //请求的发送
      let res = undefined;
      switch(method){
        case "get":
        case "delete":
          res = await axiosInstance({
            url,
            method,
            params: transformData
          });
          break;
        case "post":
        case "put":
          let configData = (config && (typeof config.data === "object"))?config.data :{};
          let endData;
          if(isForm){
            for(let key in configData){
              transformData.append(key,configData[key]);
            }
            endData = transformData;
          }else{
            endData = Object.assign(transformData,configData)
          }
          res = await axiosInstance({
            url,
            method,
            data:endData
          })
          break;
        }
        return res;
    }
  }
  return api;
}