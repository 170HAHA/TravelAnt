import Vue from 'vue'
import vSelect from './components/Select.vue'
import countries from 'docs/data/advanced.js'

Vue.component('v-select', vSelect)

Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    placeholder: "placeholder",
    value: null,
    options: countries
  }
})
