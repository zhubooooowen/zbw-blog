import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/less/reset.less'
import '@/assets/less/common.less'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import setAxios from './setAxios'
import Cookie from "js-cookie"

Vue.config.productionTip = false;
setAxios()
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(mavonEditor);


(() =>{
  if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    store.commit('setIsMobile', true)
  }else {
    store.commit('setIsMobile', false)
  }
})()

router.beforeEach((to,from,next) => {
  // 查找cookie里有没有存token
  store.commit('setToken', Cookie.get('token'))
  if(store.state.token) {
    // 有token切换成登录状态
    store.commit('changeIsSignIn', 1)
  }
  // 判断路由是否需要权限
  if(to.meta.requireAuth) {
    if(store.state.token) {
      next()
    } else {
      store.commit('changeIsSignIn', 0)
      store.commit('setToken', '')
      // 无token跳转至登录
      next({ path:'/login' })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
