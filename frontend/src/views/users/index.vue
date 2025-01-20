<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { authHeaders } from '@/common/index.js'
import moment from 'moment';

const allUsers = ref()
const fetchAllUsers = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/users/', { headers: authHeaders })

    if (status === 200) {
        allUsers.value = data.data
    }
}

   
onMounted(() => {
    fetchAllUsers()
})
</script>
<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="'Users'" />
        <div class="w-full bg-white dark:bg-boxdark p-5 rounded-md shadow">
            <div class="mt-3">
                <div class="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal dark:shadow-sm overflow-auto ">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Role
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Name
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Email
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Created at
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="dark:bg-boxdark">
                            <tr v-for="(user, index) in allUsers" :key="index">
                                <td class="px-5 py-5 border-b border-gray-200 text-md">
                                    {{ user.role }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-md">
                                    {{ user.name }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-md">
                                    {{ user.email }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-md">
                                    {{ moment(user.createdAt).format('DD-MM-YYYY') }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
<style lang="scss" scoped></style>