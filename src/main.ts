import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './i18n'

createApp(App)
.use(i18n)
.use(store)
.use(router)
.use(ElementPlus)
.mount('#app')

