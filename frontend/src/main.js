import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import VueGtag from "vue-gtag";
const vuetify = createVuetify({
    components,
    directives,
});
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(VueGtag, {
    config: { id: "G-E9QY5M2G75" }
});
app.mount('#app');
//# sourceMappingURL=main.js.map