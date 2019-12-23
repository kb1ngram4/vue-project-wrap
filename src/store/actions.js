import { GETPOSITION,GETCATEGORY,GETSHOPS } from "./mutations_types";
import $http from "@/api"
const OK = 0
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
  }
}