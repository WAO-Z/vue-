import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入 iconfont
import "./assets/iconfont/iconfont.js";

//全局注册组件
import SvgIcon from "@/components/svg-icon.vue";
Vue.component("svg-icon", SvgIcon);

import _axios from './utils/_axios'
Vue.prototype.axios = _axios

Vue.config.productionTip = false

import { Carousel, CarouselItem, Button, Dialog, Form, FormItem, Input, Dropdown, DropdownMenu, DropdownItem, Message } from 'element-ui'
Vue.use(Carousel).use(CarouselItem).use(Button).use(Dialog).use(Form).use(FormItem).use(Input).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Message);
Vue.prototype.$message = Message
new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')

