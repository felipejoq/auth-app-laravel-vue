<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-10 text-center text-3xl font-extrabold text-gray-900">Profile</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 shadow-lg rounded-lg">
            <div v-if="user" class="space-y-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                        {{ getInitials(user.first_name, user.last_name) }}
                    </div>
                    <div>
                        <h3 class="text-lg font-medium text-gray-900">{{ user.first_name }} {{ user.last_name }}</h3>
                        <p class="text-sm text-gray-500">{{ user.email }}</p>
                    </div>
                </div>
                <div class="border-t border-gray-200 pt-4">
                    <dl class="space-y-2">
                        <div class="flex justify-between">
                            <dt class="text-sm font-medium text-gray-500">Id</dt>
                            <dd class="text-sm text-gray-900">{{ user.id }}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm font-medium text-gray-500">Phone</dt>
                            <dd class="text-sm text-gray-900">{{ user.phone_number }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div v-else>
                <p class="text-center text-gray-500">Loading...</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { toast } from 'vue-sonner';

export default {
    data() {
        return {
            user: null,
        };
    },
    computed: {
        ...mapState(['isAuthenticated']),
    },
    methods: {
        getInitials(firstName, lastName) {
            return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        },
    },
    async mounted() {
        if (this.isAuthenticated) {
            try {
                const token = localStorage.getItem('auth_token');
                const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    this.user = await response.json();
                } else {
                    toast.error('Failed to fetch user data.');
                }
            } catch (error) {
                toast.error('An error occurred while fetching user data.');
            }
        }
    },
};
</script>
