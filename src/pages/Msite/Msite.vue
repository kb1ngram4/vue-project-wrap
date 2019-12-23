<template>
  <section class="content">
      <!--首页外卖-->
      <div class="on">
        <section class="msite">
          <!--首页头部-->
          <HeaderTop :title="position.name">
            <template slot="search">
              <span class="header_search">
                <i class="iconfont icon-sousuo"></i>
              </span>
            </template>
            <template slot="login">
              <span class="header_login">
                  <span class="header_login_text">登录|注册</span>
              </span>
            </template>
          </HeaderTop>
          <!--首页导航-->
          <nav class="msite_nav">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="categoryItem in categoryArr" :key="categoryItem.index">
                  <a href="javascript:" class="link_to_food" v-for="category in categoryItem" :key="category.id">
                    <div class="food_container">
                      <img :src="baseImgUrl+category.image_url">
                    </div>
                    <span>{{category.title}}</span>
                  </a>
                </div>
                
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>
            </div>
          </nav>
          <!--首页附近商家-->
          <shopList></shopList>
        </section>
      </div>
    </section>
    
</template>
<script>
import HeaderTop from "@/components/HeaderTop/HeaderTop"
import shopList from "@/components/shopList/shopList"
import _ from "lodash"
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
import {mapActions,mapState} from "vuex"
export default {
  components:{
    HeaderTop,
    shopList
  },
  computed:{
    ...mapState(["position","category","baseImgUrl"]),
    categoryArr(){
      return _.chunk(this.category,8)
 
    }
  },
  methods:{
    ...mapActions(["getPosition","getCategory"]),
    slideShow(){
      // this.$nextTick(()=>{
        new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay:true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }   
                
          }) 
      // })
    }
  },
  async created(){
    this.getPosition();
    await this.getCategory();
    this.slideShow()
  },
  mounted(){
    
  }
}
</script>

<style lang="stylus" scoped>

#app
  .content  //每个页面的内容
    >div //决定哪个页面显示
      display none
      &.on
        display block
      >section
        &.msite  //首页
          width 100%   
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          
    
</style>