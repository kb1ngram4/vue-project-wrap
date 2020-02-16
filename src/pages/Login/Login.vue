<template>
 <div class="on">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" 
              :class="{on:loginWay==='message'}"
              @click="loginWay='message'">短信登录</a>
            <a href="javascript:;" 
              :class="{on:loginWay==='password'}"
              @click="loginWay='password'">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:loginWay==='message'}">
              <section class="login_message">
                <!-- 手机号验证 -->
                <input 
                    v-model.trim="phone"
                    name="phone" v-validate="'required|mobile'" 
                    type="tel" maxlength="11" 
                    placeholder="手机号">
                <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                <button :disabled="!isRightNum || times>0"  class="get_verification" 
                        :class="{heightLight:isRightNum}"
                        @click.prevent="getCode">{{times>0?`验证码已发送${times}s`:`获取验证码`}}</button>
              </section>
              <section class="login_verification">
                <!-- 验证码校验 -->
                <input v-model="code" name="code" v-validate="{required:true,regex:/^\d{6}$/}" 
                        type="text" maxlength="8" placeholder="验证码">
                <span style="color:red" v-show="errors.has('code')" >{{errors.first('code')}}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:loginWay==='password'}">
              <section>
                <section class="login_message">
                  <!-- 用户名验证 -->
                  <input v-model="username" name="username" v-validate="'required'" type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
                  <span style="color:red" v-show="errors.has('username')" >{{errors.first('username')}}</span>
                
                </section>
                <section class="login_verification">
                  <!-- 密码验证 -->
                  <input v-model="pwd" name="pwd" v-validate="{required:true,regex:/^\w{6,13}/}" :type="right?`text`:`password`" maxlength="13" placeholder="密码">
                  <span style="color:red" v-show="errors.has('pwd')" >{{errors.first('pwd')}}</span>
                  
                  <div class="switch_button" :class="right?`on`:`off`" @click="right=!right">
                    <div class="switch_circle" :class="{right}" ></div>
                    <span class="switch_text">abc</span>
                  </div>
                </section>
                <section class="login_message">
                  <!-- 验证码验证 -->
                  <input 
                    v-model="captcha" name="captcha" 
                    v-validate="{required:true,regex:/^[0-9a-zA-Z]{4}$/}"
                    type="text" maxlength="4" placeholder="验证码">
                  <img @click="getCaptcha" ref="captcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha">
                  <span style="color:red" v-show="errors.has('captcha')"> {{errors.first('captcha')}} </span>
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.replace('/profile')">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
  </div>  
</template>
<script>
// import Vue from "vue"
import {Toast} from "vant"
import {mapActions} from "vuex"
const OK = 0
const ERROR = 1
export default {
  data(){
    return {
      loginWay:"password",//password/message
      reg_phone:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
      times:0,
      right:false,
      
      phone:"",
      code:"",
      username:"",
      pwd:'',
      captcha: ""
    }
  },
  computed:{
    isRightNum(){
      return this.reg_phone.test(this.phone)
    }
  },
  methods:{
    ...mapActions(["getUser"]),
    async getCode(){
      clearInterval(this.timer)
      this.times = 15
      //x循环定时器生命周期结束的时候清除（destroy）  
      this.timer = setInterval(() => {
        
        if(this.times>0){
          this.times--
          
        }else{
          clearInterval(this.timer)
        }
      }, 1000);
      //获取验证码，一次性的不需要交给仓库管理，
      const body = await this.$http.shop.getCode({
        phone:this.phone
      }) 
      if(body.code === OK){
        this.times = 0
        Toast.success('验证码获取成功');
      }else if(body.code === ERROR) {
        Toast.fail('验证码获取失败');
      }
      
    },
    getCaptcha(){
      //需要加时间戳，不然每次svg图都一样
      this.$refs.captcha.src = `http://localhost:4000/captcha?time=${new Date().getTime()}`
      
    },
     async login(){
      if(this.loginWay==="message"){
      const msgFlag = await this.$validator.validateAll(['phone','code'])
        this.getUser({
          loginWay:this.loginWay,
          phone:this.phone,
          code:this.code
        })
        console.log("msg");
        
      }else if(this.loginWay==="password"){
      const pwdFlag = await this.$validator.validateAll(['username','pwd','captcha'])
        this.getUser({
          loginWay:this.loginWay,
          name:this.username,
          pwd:this.pwd,
          captcha:this.captcha
        })

        console.log("pwd");
        
      }
       
    }
  },
  //清除定时器
  destroyed(){
      clearInterval(this.timer)

  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
#app
  >.off
      display none
  >.on
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
          padding-top 60px
          width 80%
          margin 0 auto
          .login_header
            .login_logo
              font-size 40px
              font-weight bold
              color #02a774
              text-align center
            .login_header_title
              padding-top 40px
              text-align center
              >a
                color #333
                font-size 14px
                padding-bottom 4px
                &:first-child
                  margin-right 40px
                &.on
                  color #02a774
                  font-weight 700
                  border-bottom 2px solid #02a774
          .login_content
            >form
              >div
                display none
                &.on
                  display block
                input
                  width 100%
                  height 100%
                  padding-left 10px
                  box-sizing border-box
                  border 1px solid #ddd
                  border-radius 4px
                  outline 0
                  font 400 14px Arial
                  &:focus
                    border 1px solid #02a774
                .login_message
                  position relative
                  margin-top 16px
                  height 48px
                  font-size 14px
                  background #fff
                  
                  .get_verification
                    position absolute
                    top 50%
                    right 10px
                    transform translateY(-50%)
                    border 0
                    color #ccc
                    font-size 14px
                    background transparent
                    &.heightLight
                      color #f90 
                .login_verification
                  position relative
                  margin-top 16px
                  height 48px
                  font-size 14px
                  background #fff
                  .switch_button
                    font-size 12px
                    border 1px solid #ddd
                    border-radius 8px
                    transition background-color .3s,border-color .3s
                    padding 0 6px
                    width 30px
                    height 16px
                    line-height 16px
                    color #fff
                    position absolute
                    top 50%
                    right 10px
                    transform translateY(-50%)
                    &.off
                      background #fff
                      .switch_text
                        float right
                        color #ddd
                    &.on
                      background #02a774
                    >.switch_circle
                      position absolute
                      top -1px
                      left -1px
                      width 16px
                      height 16px
                      border 1px solid #ddd
                      border-radius 50%
                      background #fff
                      box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                      transition transform .3s
                      &.right
                        transform translateX(27px)
                .login_hint
                  margin-top 12px
                  color #999
                  font-size 14px
                  line-height 20px
                  >a
                    color #02a774
              .login_submit
                display block
                width 100%
                height 42px
                margin-top 30px
                border-radius 4px
                background #4cd96f
                color #fff
                text-align center
                font-size 16px
                line-height 42px
                border 0
            .about_us
              display block
              font-size 12px
              margin-top 20px
              text-align center
              color #999
          .go_back
            position absolute
            top 5px
            left 5px
            width 30px
            height 30px
            >.iconfont
              font-size 20px
              color #999
</style>