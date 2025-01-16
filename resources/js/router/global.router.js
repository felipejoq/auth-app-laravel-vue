import { createRouter, createWebHistory } from 'vue-router';
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import store from '../stores/globa.store.js';

const routes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (store.state.isAuthenticated) {
        if (to.path === '/' || to.path === '/register') {
            next({ path: '/profile' });
        } else {
            next();
        }
    } else {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            next({ path: '/', query: { redirect: to.fullPath } });
        } else {
            next();
        }
    }
});

export default router;
