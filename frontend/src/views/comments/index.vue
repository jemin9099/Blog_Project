<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DeleteDialog from '@/views/comments/DeleteDialog.vue'
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { authHeaders } from '@/common/index.js'

const allComments = ref()
const deleteBlog = ref()
const fetchAllComments = async() => {
    const {data , status} = await axios.get(import.meta.env.VITE_API_BASE_URL+'/comments/all' , {headers:authHeaders})
    
    if(status === 200){
        allComments.value = data.data
    }
}
 onMounted(() => {
    fetchAllComments()
 })
</script>
<template>
    <teleport to='body'>
        <DeleteDialog ref="deleteBlog" @refresh="fetchAllComments()"/>
    </teleport>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="'Comments'" />
        <div class="w-full bg-white dark:bg-boxdark p-5 rounded-md shadow">
            <div class="mt-3">
                <div class="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Blog
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Created By
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Comment
                                </th>
                                <th
                                    class="px-5 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(comment, index) in allComments" :key="index">
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {{ comment.blogId.title }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {{ comment.author.name }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {{ comment.comment }}
                                </td>
                                
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center">
                                    <span @click="deleteBlog.open(comment)">
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
<style lang="scss" scoped>

</style>