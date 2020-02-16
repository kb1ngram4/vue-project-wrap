import Vue from 'vue'
import VeeValidate, { Field } from 'vee-validate'
import zh_CN from "vee-validate/dist/locale/zh_CN"
Vue.use(VeeValidate)


VeeValidate.Validator.localize('zh_CN',{
  messages: zh_CN.messages,
  attributes:{
    phone:"手机号",
    code:"验证码",
    username:'该用户名',
    pwd:"密码",
    captcha:"验证码"
  }
})

VeeValidate.Validator.extend('mobile',{
  validate: value=>{
    return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value)
  },
  getMessage: field=>field + '必须是11位手机号码'
})
