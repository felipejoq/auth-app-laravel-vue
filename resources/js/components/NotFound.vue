<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-10 text-center text-3xl font-extrabold text-gray-900">404 - Page Not Found</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 shadow-lg rounded-lg">
            <p class="text-gray-500">
                The page you are looking for does not exist.
            </p>
            <p class="mt-6">
                <router-link to="/" class="mr-4 bg-indigo-400 px-4 py-2 rounded hover:bg-indigo-500 text-white">
                    Go to Home
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>
