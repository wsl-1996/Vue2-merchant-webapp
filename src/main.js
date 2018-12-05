// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import 'muse-ui/dist/muse-ui.css';
import global_ from '@/components/Global.vue'
import webSocket from '@/util/webSocket.js'
import Message from 'muse-ui-message'
Vue.use(Message);
Vue.prototype.GLOBAL= global_
Vue.use(MuseUI)
Vue.use(Vueaxios,axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return{
      webSocket:webSocket
    }
  }
})
