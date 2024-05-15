//main.js
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../src/components/stylesheets/transitions.css'
import * as bootstrap from 'bootstrap';
// import { auth } from './firebase';
// import { db } from './firebase';

createApp(App)
.use(router)
.mount('#app')
