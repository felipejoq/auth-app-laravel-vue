<template>
    <div>
        <nav class="bg-indigo-600 text-white p-6 flex justify-between items-center shadow-md">
            <h1 class="text-2xl font-bold">Auth App</h1>
            <div>
                <button
                    v-if="!isAuthenticated && currentComponent !== 'Register'"
                    @click="navigate('Register')"
                    class="mr-4 bg-indigo-400 px-4 py-2 rounded hover:bg-indigo-500"
                >
                    Register
                </button>
                <button
                    v-if="!isAuthenticated && currentComponent !== 'Login'"
                    @click="navigate('Login')"
                    class="bg-indigo-400 px-4 py-2 rounded hover:bg-indigo-500"
                >
                    Login
                </button>
                <button
                    v-if="isAuthenticated"
                    @click="logout"
                    class="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </nav>

        <div class="container mx-auto mt-6">
            <component :is="currentComponent" @navigate="navigate" />
        </div>

        <Toaster />
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Register from './Register.vue';
import Login from './Login.vue';
import Profile from './Profile.vue';
import {Toaster} from 'vue-sonner';
import router from '../router/global.router.js';

export default {
    components: {
        Register,
        Login,
        Profile,
        Toaster,
    },
    computed: {
        ...mapState(['isAuthenticated', 'currentComponent']),
    },
    methods: {
        ...mapActions(['checkAuthentication', 'logout', 'login']),
        navigate(component) {
            if (this.isAuthenticated && (component === 'Login' || component === 'Register')) {
                toast.error('You are already logged in!');
                return;
            }
            this.$store.commit('setCurrentComponent', component);
            router.push(`/${component.toLowerCase()}`); // Update the URL dynamically
        },
    },
    mounted() {
        this.checkAuthentication();
    },
};
</script>

<style>
.container {
    max-width: 800px;
}
</style>
