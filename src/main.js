import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import jQuery from 'jquery'
import 'bootstrap/dist/js/bootstrap.js'
import 'popper.js'

global.jQuery = global.$ = jQuery

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
