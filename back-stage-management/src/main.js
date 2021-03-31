

import Vue from 'vue';
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import jquery from 'jquery'
import store from './store'

Vue.prototype.$ = jquery
Vue.prototype.$imgUrl = 'http://82.156.15.149/'

Vue.use(ElementUI);
Vue.config.productionTip = false

//引入封装好的全局模块
import gCom from './common'
for(let i in gCom){
  Vue.component(i,gCom[i])
}


//全局引入echart
let echarts = require('echarts')
Vue.prototype.$echarts = echarts

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
