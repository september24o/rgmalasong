import { createApp } from 'vue'
import { Button, Field } from 'vant'
import 'vant/lib/index.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(Button)
app.use(Field)
app.mount('#app')