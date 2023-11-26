import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMinus, faPlus, faRightLong } from '@fortawesome/free-solid-svg-icons'


library.add(faRightLong, faPlus, faMinus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

//import atom component
const AtomComponents = ['AtomInput', 'AtomSelect', 'AtomLabel'];
AtomComponents.forEach((AtomComponent) => {
  import(`@/components/atom/${AtomComponent}.vue`).then((component) => {
    Vue.component(AtomComponent, component.default);
  });
})

new Vue({
  render: h => h(App),
}).$mount('#app')
