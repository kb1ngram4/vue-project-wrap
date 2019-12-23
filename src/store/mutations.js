import { GETPOSITION,GETCATEGORY,GETSHOPS } from "./mutations_types";
export default {
  [GETPOSITION](state,position){
    state.position = position
  },

  [GETCATEGORY](state,category){
    state.category = category
  },

  [GETSHOPS](state,shops){
    state.shops = shops
  }
}