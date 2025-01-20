<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import { useRoute } from 'vue-router';
import { authHeaders } from '@/common/index.js'
import axios from 'axios';
import { ref, onMounted , watch } from 'vue'
import moment from 'moment';
import { useToast } from '@/common/useToast.js'
import { decode } from 'entities'
const route = useRoute()
const { toastTypeSuccess, toastTypeError } = useToast()
const blogDetail = ref()
const reletedData = ref()
const commentData = ref()
const allComments = ref()
const CommentCount = ref()
const likeCount = ref()
const isLike = ref(false)
const fetchData = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/blogs/', { headers: authHeaders, params: { title: route.params.name } })
    if (status === 200) {
        blogDetail.value = data.data[0]
        blogDetail.value.description = decode(blogDetail.value.description)
        fetchReletedData()
        getAllComments()
        getLikeCount()
    }
}
const fetchReletedData = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/blogs/category/' + blogDetail.value?.category._id, { headers: authHeaders })
    if (status === 200) {
        reletedData.value = data.data
    }
}

const handleComment = async () => {
    const payload = {
        comment: commentData.value,
        blogId: blogDetail.value._id
    }
    const { data, status } = await axios.post(import.meta.env.VITE_API_BASE_URL + '/comments/add', payload, { headers: authHeaders })

    if (status === 201) {
        toastTypeSuccess('Comment added successfully')
        getAllComments()
        commentData.value = ''
    }
    else {
        toastTypeError('Error while comment adding')
    }
}
const getAllComments = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/comments/', { headers: authHeaders, params: { blogId: blogDetail.value._id } })
    if (status === 200) {
        allComments.value = data.data
        commentCount()
    }
}

const commentCount = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/comments/count', { headers: authHeaders, params: { blogId: blogDetail.value._id } })
    if (status === 200) {
        CommentCount.value = data.data

    }
}

const handleLike = async () => {
    const payload = {
        blogId: blogDetail.value._id
    }
    const { data, status } = await axios.post(import.meta.env.VITE_API_BASE_URL + '/like', payload, { headers: authHeaders })
    if (status === 201) {
        getLikeCount()
    }
}
const getLikeCount = async () => {
    const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/like/count', { headers: authHeaders, params: { blogId: blogDetail.value._id } })
    if (status === 200) {
        likeCount.value = data.data
        isLike.value = data.isUserLike
    }
}
watch(() => route.params.name,() => {
    fetchData()
})
onMounted(() => {
    fetchData()
})
</script>
<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="$route.params.name" />
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2 bg-white dark:bg-boxdark rounded-md p-4 ">
                <div class="text-title-sm font-semibold mb-3">
                    {{ blogDetail?.title }}
                </div>
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center">
                        <img :src="blogDetail?.author.avatar" class="rounded-full" width="50" alt="">
                        <div class="ms-2">
                            <div class="font-semibold">{{ blogDetail?.author.name }}</div>
                            <time datetime="2023-03-13"
                                class="text-xs md:text-sm capitalize text-gray-400 font-semibold flex">
                                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current me-2" width="22" height="22"
                                    viewBox="0 0 22 22" fill="none">
                                    <title>calendar-month</title>
                                    <path
                                        d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" />
                                </svg>
                                {{ moment(blogDetail?.createdAt).format('MMMM Do YYYY') }}
                            </time>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="flex">
                            <span @click="handleLike">
                                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current me-2" width="22" height="22"
                                    viewBox="0 0 22 22" fill="none" v-if="!isLike">
                                    <title>heart-outline</title>
                                    <path
                                        d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="fill-red-500 me-2" width="22" height="22"
                                    viewBox="0 0 22 22" fill="none" v-else>
                                    <title>heart</title>
                                    <path
                                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                </svg>
                            </span>
                            <span> {{ likeCount }}</span>
                        </div>
                        <div class="flex">
                            <span><svg xmlns="http://www.w3.org/2000/svg" class="fill-current me-2" width="22"
                                    height="22" viewBox="0 0 22 22" fill="none">
                                    <title>chat-outline</title>
                                    <path
                                        d="M12,3C6.5,3 2,6.58 2,11C2.05,13.15 3.06,15.17 4.75,16.5C4.75,17.1 4.33,18.67 2,21C4.37,20.89 6.64,20 8.47,18.5C9.61,18.83 10.81,19 12,19C17.5,19 22,15.42 22,11C22,6.58 17.5,3 12,3M12,17C7.58,17 4,14.31 4,11C4,7.69 7.58,5 12,5C16.42,5 20,7.69 20,11C20,14.31 16.42,17 12,17Z" />
                                </svg></span>
                            <span>{{ CommentCount }}</span>
                        </div>
                    </div>
                </div>
                <img :src="blogDetail?.image" class="w-full" alt="">
                <div v-html="blogDetail?.description"></div>
                <hr class="my-5">
                <div>
                    <div class="text-title-sm font-semibold mb-3">
                        <div class="flex">
                            <span><svg xmlns="http://www.w3.org/2000/svg" class="fill-primary me-2" width="22"
                                    height="22" viewBox="0 0 22 22" fill="none">
                                    <title>chat-outline</title>
                                    <path
                                        d="M12,3C6.5,3 2,6.58 2,11C2.05,13.15 3.06,15.17 4.75,16.5C4.75,17.1 4.33,18.67 2,21C4.37,20.89 6.64,20 8.47,18.5C9.61,18.83 10.81,19 12,19C17.5,19 22,15.42 22,11C22,6.58 17.5,3 12,3M12,17C7.58,17 4,14.31 4,11C4,7.69 7.58,5 12,5C16.42,5 20,7.69 20,11C20,14.31 16.42,17 12,17Z" />
                                </svg></span>
                            Comments
                        </div>
                    </div>
                    <div class="">
                        <label for="comment" class="mb-2">Comment :</label>
                        <textarea name="" v-model="commentData"
                            class="w-full mt-2 border rounded-md border-gray-300 focus-within:outline-primary"
                            id="comment" rows="3"></textarea>
                    </div>
                    <button class="mt-5 bg-primary py-2 px-3 rounded-md text-white" @click="handleComment">
                        Submit
                    </button>
                </div>
                <hr class="my-5">
                <div class="text-title-sm font-semibold mb-3">
                    {{ allComments?.length }} Comments
                </div>
                <div v-for="(comment, index) in allComments" :key="index" class="border-b p-2">
                    <div class="flex gap-2">
                        <div>
                            <img :src="comment.author.avatar" class="rounded-full" width="50" alt="">
                        </div>
                        <div>
                            <p class="font-semibold">{{ comment.author.name }}</p>
                            <p>{{ moment(comment?.createdAt).format('DD-MM-YYYY') }}</p>
                            <div class="pt-3 font-semibold">
                                {{ comment.comment }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="bg-white dark:bg-boxdark rounded-md p-4">
                    <div class="text-title-sm font-semibold mb-3">
                        Related Blogs
                    </div>
                    <div  v-for="(blog, index) in reletedData" :key="index">
                        <RouterLink :to="'/'+blog.category.name+'/'+blog.title" class="flex items-center mb-3">
                            <img :src="blog.image" class="w-[26%] rounded me-3" alt="">
                            <div class="text-lg font-semibold">
                                {{ blog.title }}
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
<style lang="scss" scoped></style>