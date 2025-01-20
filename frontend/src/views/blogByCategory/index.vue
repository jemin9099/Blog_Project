<script setup lang="ts">
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import { authHeaders } from '@/common/index.js'
import axios from 'axios';
import { ref, watch } from 'vue'
import moment from 'moment';

const route = useRoute()
const title = ref()
const blogData = ref()
const fetchData = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/blogs/category/' + route.params.id, { headers: authHeaders })
    if (status === 200) {
        blogData.value = data.data
        title.value = blogData.value[0]?.category.name
    }
}
watch(() => route.params.id, () => {
    fetchData()
}, { deep: true })
fetchData()
</script>
<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="title" v-if="title"/>
        <div class="flex h-full mx-auto justify-center items-center">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 w-full" v-if="blogData?.length">
                <div class="w-full bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
                    v-for="(blog, index) in blogData" :key="index">
                    <img :src="blog.image" class="h-48 w-full object-cover"></img>
                    <div class="p-4">
                        <time datetime="2023-03-13" class="text-xs md:text-sm capitalize text-gray-400 font-semibold">
                            {{ moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}
                        </time>
                        <h2 class="my-1 text-2xl font-bold leading-relaxed">{{ blog.title }}</h2>
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-gray-400 font-medium">Author :</span>
                                <span class="ms-2 font-semibold">{{ blog.author.name }}</span>
                            </div>
                        </div>
                        <RouterLink :to="'/'+blog.category.name+'/'+blog.title"
                            class="mt-4 py-2.5 px-6 rounded-full border font-medium text-white bg-black hover:text-black hover:bg-white hover:border hover:border-black flex justify-center items-center space-x-2 transition duration-300">
                            <span>Learn more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="bg-white p-10 rounded-md w-full text-center" v-else>
                <span class="text-lg font-bold ">No Data Found</span>
            </div>
        </div>
    </DefaultLayout>
</template>
<style scoped></style>