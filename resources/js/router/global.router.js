import { createRouter, createWebHistory } from 'vue-router';
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import NotFound from "../components/NotFound.vue";
import store from '../stores/globa.store.js';

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: '/', query: { redirect: to.fullPath } });
    } else if (isAuthenticated && (to.path === '/' || to.path === '/register')) {
        next({ path: '/profile' });
    } else {
        next();
    }
});

export default router;
