<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Dropzone from '@/components/Dropzone.vue'
import Editor from '@/components/Editor.vue';
import slugify from 'slugify'
import axios from 'axios';
import { ref,onMounted , watch } from 'vue';
import { authHeaders } from '@/common/index.js'
import { useToast } from '@/common/useToast.js'
import { useRouter } from 'vue-router';
const { toastTypeSuccess, toastTypeError } = useToast()
const router = useRouter()
const isOptionSelected = ref(false)
const categoryList = ref()
const nameError = ref()
const slugError = ref()
const categoryError = ref()
const dropzoneRef = ref()
const formData = ref({
    title:'',
    slug:'',
    category:'',
    description:'<h1> This is a blog description here...... </h1>'
})
const validateName = () => {
  nameError.value = formData.value.title.trim() ? '' : 'Name is required';
};

const validateSlug = () => {
  slugError.value = formData.value.slug.trim() ? '' : 'Slug is required';
};
const validateCategory = () => {
  categoryError.value = formData.value.category.trim() ? '' : 'Category is required';
};
const fetchCategories = async () => {
    const {data , status} = await axios.get(import.meta.env.VITE_API_BASE_URL+'/category/all',{headers:authHeaders})
    if(status === 200){
        categoryList.value = data.data
    }
}

const handleChangeData = (editor:any) =>{
    console.log(editor);
    formData.value.description = editor    
}

const handleSubmit = async() => {
    validateName()
    validateCategory()
    validateSlug()
    if(!nameError.value && !slugError.value && !categoryError.value){
        const user = JSON.parse(localStorage.getItem('authData') as any)        
        const newFormData = new FormData()
        newFormData.append('title' , formData.value.title)
        newFormData.append('slug' , formData.value.slug)
        newFormData.append('description' , formData.value.description)
        newFormData.append('category' , formData.value.category)
        newFormData.append('author' , user.data._id)
        newFormData.append('file' , dropzoneRef.value.getFilesData()[0])

        const {data , status} = await axios.post(import.meta.env.VITE_API_BASE_URL+'/blogs/add' ,newFormData , {headers:authHeaders})
        if(status === 201){
            router.push({name:'blogs'})
            toastTypeSuccess('Category Updated successfully');
        }
        else{
            toastTypeError('Error While updating category')
        }
    }
    
}
watch(() => formData.value.title , () => {
    const slug = slugify(formData.value.title , {lower:true})
    formData.value.slug = slug
})
onMounted(() => {
    fetchCategories()
})
</script>
<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="'Create Blog'" />
        <div class="w-full bg-white dark:bg-boxdark p-5 rounded-md shadow">
            <div class="flex flex-col gap-5.5">
                <div>
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                        Name
                    </label>
                    <input type="text" placeholder="Enter Category Name" v-model="formData.title"
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        :class="nameError ? 'border-red-500' : 'border-stroke'" />

                    <div v-if="nameError" class="text-red-500">{{nameError}}</div>
                </div>
                <div>
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                        Slug
                    </label>
                    <input type="text" placeholder="Slug" v-model="formData.slug"
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        :class="slugError ? 'border-red-500' : 'border-stroke'" />
                    <div v-if="slugError" class="text-red-500">{{slugError}}</div>
                </div>
                <div>
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                         Category
                    </label>
                    <div x-data="{ isOptionSelected: false }" class="relative z-20 bg-white dark:bg-form-input">
                        <select
                            class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                            :class="isOptionSelected && 'text-black dark:text-white'"
                            @change="isOptionSelected = true" v-model="formData.category" placeholder="Select an category">
                            <option :value="item._id" class="text-body" v-for="(item , index) in categoryList" :key="index">{{item.name}}</option>
                        </select>
                        <span class="absolute right-4 top-1/2 z-20 -translate-y-1/2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.8">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                        fill="#637381"></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <div v-if="categoryError" class="text-red-500">{{categoryError}}</div>
                </div>
                <div>
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                        Featured Image
                   </label>
                   <Dropzone ref="dropzoneRef"/>
                </div>
                <div>
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                        Description
                   </label>
                   <Editor :initialData="formData.description" @onChange="handleChangeData"/>
                </div>
                <div class="text-end" @click="handleSubmit">
                    <button class="bg-primary text-white py-2 px-3 rounded">Submit</button>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
<style scoped></style>