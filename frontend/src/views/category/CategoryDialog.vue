<script setup lang="ts">
import { ref, defineExpose ,watch , defineEmits} from 'vue';
import slugify from 'slugify'
import axios from 'axios';
import { useToast } from '@/common/useToast.js'
import { authHeaders } from '@/common/index.js'
const { toastTypeSuccess, toastTypeError } = useToast()
const emit = defineEmits(['refresh'])
const dialog = ref()
const title = ref()
const nameError = ref()
const slugError = ref()
const isUpdate = ref(false)
const categoryId = ref()
const formData = ref({
    name:'',
    slug:''
})
const open = (name: string , item?:any) => {

    dialog.value = true
    title.value = name
    if(name == 'Update Category'){
        categoryId.value = item._id
        isUpdate.value = true
        formData.value.name = item.name
        formData.value.slug = item.slug
    }
    else{
        formData.value.name = ''
        formData.value.slug = ''
        isUpdate.value = false
    }
}

const validateName = () => {
  nameError.value = formData.value.name.trim() ? '' : 'Name is required';
};

const validateSlug = () => {
  slugError.value = formData.value.slug.trim() ? '' : 'Slug is required';
};

const handleSubmit = async () => {
    validateName()
    validateSlug()
    if(!nameError.value && !slugError.value){
      if(isUpdate.value){
        const {data , status} = await axios.put(import.meta.env.VITE_API_BASE_URL+'/category/update/'+categoryId.value,formData.value,{headers:authHeaders})
        if(status === 200){
            toastTypeSuccess('Category Updated successfully');
            emit('refresh')
            dialog.value = false
            formData.value.name = ''
            formData.value.slug = ''
        }
        else{
            toastTypeError('Error While updating category')
        }
      }
      else{
        const {data , status} = await axios.post(import.meta.env.VITE_API_BASE_URL+'/category/add',formData.value,{headers:authHeaders})
        if(status === 201){
            toastTypeSuccess('Category created successfully');
            emit('refresh')
            dialog.value = false
            formData.value.name = ''
            formData.value.slug = ''
        }
        else{
            toastTypeError('Error While creating category')
        }
      }
    }
}

watch(() => formData.value.name , () => {
    const slug = slugify(formData.value.name , {lower:true})
    formData.value.slug = slug
})
defineExpose({ open })
</script>
<template>
    <div v-if="dialog"
        class="fixed inset-0 z-9999 bg-black bg-opacity-50 flex items-center justify-center overflow-auto ">
        <div class="bg-white  dark:bg-boxdark rounded-lg shadow-lg p-6 max-w-3xl w-full h-100 overflow-auto">
            <div class="flex justify-between items-center mb-4 ">
                <h2 class=" text-title-md2 font-semibold text-black dark:text-white ps-2">{{ title }}</h2>
                <span @click="dialog=false">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current me-2" width="26" height="26" viewBox="0 0 26 26" fill="none"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                </span>
            </div>
            <hr>
            <div class="mt-5">
                <div class="flex flex-col gap-5.5">
                    <div>
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            Name
                        </label>
                        <input type="text" placeholder="Enter Category Name" v-model="formData.name"
                            class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" :class="nameError?'border-red-500':'border-stroke'" />

                        <div v-if="nameError" class="text-red-500">{{nameError}}</div>
                    </div>
                    <div>
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            Slug
                        </label>
                        <input type="text" placeholder="Slug" v-model="formData.slug"
                            class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" :class="slugError?'border-red-500':'border-stroke'" />
                            <div v-if="slugError" class="text-red-500">{{slugError}}</div>
                    </div>
                    <div>
                        <button
                            class="rounded-lg px-4 py-2  bg-blue-600 text-white  duration-300  font-semibold w-full text-center" @click="handleSubmit()">
                            {{ isUpdate?'Update' : 'Submit' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>