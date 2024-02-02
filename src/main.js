import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

 new Vue({
 name:'root',
  router,
  store,//  注意 ：你写的方法，要在每一组件中使用 原因：组件的渲染关系 是父子关系
  render: h => h(App)
}).$mount('#app')


