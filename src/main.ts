import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import api from './plugins/api'

const app = createApp(App)

app.config.globalProperties.$http = api.MyAPI;

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
