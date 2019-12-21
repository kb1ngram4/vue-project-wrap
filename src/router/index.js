import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return routerReplace.call(this, location).catch(error=> error)
}
import routes from "@/routes"
export default new VueRouter({
  routes
})