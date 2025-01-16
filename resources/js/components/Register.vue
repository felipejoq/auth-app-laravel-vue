<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register a new account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="register">
                <div>
                    <label for="first_name" class="block text-sm/6 font-medium text-gray-900">First Name</label>
                    <div class="mt-2">
                        <input v-model="first_name" type="text" id="first_name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="last_name" class="block text-sm/6 font-medium text-gray-900">Last Name</label>
                    <div class="mt-2">
                        <input v-model="last_name" type="text" id="last_name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="phone_number" class="block text-sm/6 font-medium text-gray-900">Phone Number</label>
                    <div class="mt-2">
                        <input v-model="phone_number" type="text" id="phone_number" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input v-model="email" type="email" id="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div class="mt-2">
                        <input v-model="password" type="password" id="password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="password_confirmation" class="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                    <div class="mt-2">
                        <input v-model="password_confirmation" type="password" id="password_confirmation" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?
                <a href="#" @click.prevent="navigateToLogin" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</a>
            </p>
        </div>
    </div>
</template>

<script>
import { toast } from 'vue-sonner';

export default {
    data() {
        return {
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            password: '',
            password_confirmation: '',
        };
    },
    methods: {
        async register() {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        first_name: this.first_name,
                        last_name: this.last_name,
                        phone_number: this.phone_number,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
                    }),
                });
                const data = await response.json();

                if (response.ok) {
                    toast.success('Registration successful!');
                    this.$emit('navigate', 'Login');
                } else {
                    this.handleErrors(data.errors);
                }
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    this.handleErrors(error.response.data.errors);
                } else {
                    toast.error('An error occurred during registration.');
                }
            }
        },
        handleErrors(errors) {
            Object.keys(errors).forEach((key) => {
                errors[key].map(error => toast.error(error));
            });
        },
        navigateToLogin() {
            this.$emit('navigate', 'Login');
        },
    },
};
</script>
