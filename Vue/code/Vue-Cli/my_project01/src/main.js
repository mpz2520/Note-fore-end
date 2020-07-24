/* eslint-disable */
/*上面第一行注释是关闭eslint语法限制，太烦人了*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//手动配置 element-ui
import ElementUI from 'element-ui'  
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
