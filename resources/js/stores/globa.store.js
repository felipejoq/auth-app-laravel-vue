import router from '../router/global.router.js';
import {createStore} from "vuex";

export default createStore({
    state: {
        isAuthenticated: false,
        currentComponent: '',
    },
    mutations: {
        setAuthentication(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        setCurrentComponent(state, component) {
            state.currentComponent = component;
        },
    },
    actions: {
        checkAuthentication({ commit }) {
            const token = localStorage.getItem('auth_token');
            const isAuthenticated = !!token;
            commit('setAuthentication', isAuthenticated);
            commit('setCurrentComponent', isAuthenticated ? 'Profile' : 'Login');
        },
        login({ commit }, token) {
            localStorage.setItem('auth_token', token);
            commit('setAuthentication', true);
            commit('setCurrentComponent', 'Profile');
        },
        logout({ commit }) {
            localStorage.removeItem('auth_token');
            commit('setAuthentication', false);
            commit('setCurrentComponent', 'Login');
            router.push('/');
        },
    },
});
