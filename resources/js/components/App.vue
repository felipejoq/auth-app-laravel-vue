<template>
    <div>
        <nav class="bg-indigo-600 text-white p-6 flex justify-between items-center shadow-md">
            <h1 class="text-2xl font-bold">Auth App</h1>
            <div>
                <button
                    v-if="!isAuthenticated && currentRoute !== 'Register'"
                    @click="navigate('Register')"
                    class="mr-4 bg-indigo-400 px-4 py-2 rounded hover:bg-indigo-500"
                >
                    Register
                </button>

                <button
                    v-if="!isAuthenticated && currentRoute !== 'Login'"
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

        <router-view class="container mx-auto mt-6" />
        <Toaster />
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Toaster, toast } from 'vue-sonner';
import router from '../router/global.router.js';

export default {
    components: { Toaster },
    setup() {
        const store = useStore();
        const isAuthenticated = computed(() => store.state.isAuthenticated);
        const currentRoute = computed(() => router.currentRoute.value.name);

        const navigate = (component) => {
            const routePath = component === 'Login' ? '/' : `/${component.toLowerCase()}`;
            router.push(routePath);
        };

        const logout = () => {
            store.dispatch('logout');
        };

        onMounted(() => {
            store.dispatch('checkAuthentication');
        });

        return {
            isAuthenticated,
            currentRoute,
            navigate,
            logout,
        };
    },
};
</script>

<style>
.container {
    max-width: 800px;
}
</style>
