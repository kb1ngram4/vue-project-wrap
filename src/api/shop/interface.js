export default {
  //请求方法
  // getGoods:{
  //   url:"/api/goods",
  //   method:"get"
  // },
  // getSellers:{
  //   url:"/api/sellers",
  //   method:"get"
  // },
  // getRatings:{
  //   url:"/api/ratings",
  //   method:"get"
  // }

  getPosition:{
    url:"/position",
    method:"get",
    //跨域，有corsUrl才能跨域
    corsUrl:"/4000"
  },

  getCategory:{
    url:"/index_category",
    method:"get",
    corsUrl:"/4000"
  },

  getShops:{
    url:"/shops",
    method:"get",
    corsUrl:"/4000"
  }
}