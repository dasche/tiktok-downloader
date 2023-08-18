import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './assets/style.css'
import App from './App.vue'

// Base Components
import BaseAlert from './components/base/BaseAlert.vue'
import BaseLoading from './components/base/BaseLoading.vue'
import BaseButton from './components/base/BaseButton.vue'

const app = createApp(App)

app.component('BaseAlert', BaseAlert)
app.component('BaseLoading', BaseLoading)
app.component('BaseButton', BaseButton)
app.use(MotionPlugin)

app.mount('#app')
