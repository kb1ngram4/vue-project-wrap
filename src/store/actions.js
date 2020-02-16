import { GETPOSITION,GETCATEGORY,GETSHOPS,GETUSER } from "./mutations_types";
import $http from "@/api"
const OK = 0
const ERROR = 1
function loginSuccess(commit,user) {
    commit(GETUSER,user)
}
function loginFail(error) {
  
}
export default {
  async getPosition(store){
    const body = await $http.shop.getPosition({
      "latitude":store.state.latitude,
      "longitude":store.state.longitude
    })

    if(body.code===OK){
      store.commit(GETPOSITION,body.data)
    }

  },
  async getCategory(store){
    const body =  await $http.shop.getCategory()
    
    if(body.code === OK){
      store.commit(GETCATEGORY,body.data)
    }
  },
  async getShops(store){
    const body = await $http.shop.getShops({
      "latitude" : store.state.latitude,
      "longitude": store.state.longitude
    })
    
    if(body.code === OK ){
      store.commit(GETSHOPS,body.data)
    }
  },
  
  async getUser({commit},{loginWay,phone,code,name,pwd,captcha}){
    let body = ""
    if(loginWay==="message"){
      body =  await $http.shop.loginSms({
        phone,
        code
      })
    }else if(loginWay==="password"){
      body = await $http.shop.loginPwd({
        name,
        pwd,
        captcha
      })
    }
    body.code === OK && loginSuccess(commit,body.data)
    body.code === ERROR && loginFail(body.data)

  }

  
}