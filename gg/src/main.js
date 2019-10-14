import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
// 打进原生隐藏属性，就可以用this来访问
Vue.prototype.axios=axios;
Vue.config.productionTip = false;
//过滤器
Vue.filter('setWH',(url,arg)=>{
  //把url替换成传进来的arg
  return url.replace(/w\.h/,arg);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
