import { createApp } from 'vue';
import App from './components/App.vue';
import store from './stores/globa.store.js';
import './bootstrap';
import '../css/app.css';
import router from "./router/global.router.js";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
