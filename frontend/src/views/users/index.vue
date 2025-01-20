<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DeleteDialog from '@/views/comments/DeleteDialog.vue'
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { authHeaders } from '@/common/index.js'
import moment from 'moment';

const allUsers = ref()
const deleteBlog = ref()
const fetchAllUsers = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/users/', { headers: authHeaders })

    if (status === 200) {
        allUsers.value = data.data
    }
}

const namedAvatar = (name) => {
    const shortName = name.split(' ')
    console.log(shortName[0].charAt(0));
    return `${shortName[0].charAt(0)} ${shortName[1].charAt(0)}`
}   
onMounted(() => {
    fetchAllUsers()
})
</script>
<template>
    <teleport to='body'>
        <DeleteDialog ref="deleteBlog" @refresh="fetchAllComments()" />
    </teleport>
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
                                <td class="px-5 py-5 border-b border-gray-200 text-md ">
                                    <span @click="deleteBlog.open(comment)" >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-red " width="26" height="26"
                                            viewBox="0 0 22 22" fill="none">
                                            <title>delete-outline</title>
                                            <path
                                                d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                                        </svg>
                                    </span>
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