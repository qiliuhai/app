import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/stroe'
// 引入mock
import '@/mock'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 注册全局组件
import TypeNave from '@/components/TypeNave'
Vue.component(TypeNave.name, TypeNave)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

import { button, MessageBox } from 'element-ui'
Vue.use(button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 放在vm身上，到处都可以用
import *as API from '@/API'

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API

  },

  store,
  router,
  render: h => h(App),
}).$mount('#app')

