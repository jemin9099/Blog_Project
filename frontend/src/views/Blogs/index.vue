<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DeleteDialog from '@/views/Blogs/DeleteDialog.vue'
import { useRouter } from 'vue-router';
import moment from 'moment'
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { authHeaders } from '@/common/index.js'
const deleteBlog = ref()
const router = useRouter();
const blogList = ref()
const fetchBlogs = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/blogs/all', { headers: authHeaders })
    if (status === 200) {
        blogList.value = data.data
    }
}

onMounted(() => {
    fetchBlogs()
})
</script>
<template>
    <teleport to='body'>
        <DeleteDialog ref="deleteBlog" @refresh="fetchBlogs()"/>
    </teleport>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="'Blogs'" />
        <div class="w-full bg-white dark:bg-boxdark p-5 rounded-md shadow">
            <button
                class="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300 flex items-center font-semibold"
                @click="router.push({ name: 'blog-create' })">
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current me-2" width="22" height="22"
                    viewBox="0 0 22 22" fill="none">
                    <title>plus</title>
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                </svg>
                Add Blog
            </button>
            <div class="mt-3">
                <div class="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Author
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Category
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Title
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(blog, index) in blogList" :key="index">
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {{ blog.author.name }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {{ blog.category.name }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {{ blog.title }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {{ blog.slug }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {{ moment(blog.createdAt).format('DD-MM-YYYY') }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center">
                                    <span class="me-4" @click="router.push({name:'blog-edit' , params:{id:blog._id}})">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-primary " width="26"
                                            height="26" viewBox="0 0 22 22" fill="none">
                                            <title>square-edit-outline</title>
                                            <path
                                                d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                                        </svg>
                                    </span>
                                    <span @click="deleteBlog.open(blog)">
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
<style scoped></style>