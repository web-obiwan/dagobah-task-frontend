import App from './App.vue'

import { createApp } from 'vue'
import './style.css'


import { registerPlugins } from '@/plugin'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
