import { createApp } from 'vue'
import './styles/style.css'
import './styles/markdown.css'
import App from './App.vue'
import router from './router';
import 'remixicon/fonts/remixicon.css'

createApp(App).use(router).mount('#app')
