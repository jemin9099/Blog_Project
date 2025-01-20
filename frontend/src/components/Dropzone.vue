<script setup lang="ts">
import { useDropZone, useFileDialog, useObjectUrl } from '@vueuse/core'
import { ref, defineExpose } from 'vue';

const allowedMimeTypes = [
  'application/pdf',                // PDF
  'application/vnd.ms-excel',       // Excel (xls)
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel (xlsx)
  'application/msword',             // Word (doc)
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // Word (docx)
]

const { open, onChange } = useFileDialog({
  multiple: false,
})

const filesData = ref<any>([])
const dropZoneRef = ref()

const onDrop = (DroppedFiles :any) => {
  // if (!props.isMultiple) {
  //   if (DroppedFiles && DroppedFiles?.length > 1) {

  //     return
  //   }
  // }

  DroppedFiles?.forEach((file:any) => {

    filesData.value.push({
      file,
      url: useObjectUrl(file).value ?? '',

    })

  })
}

onChange((selectedFiles) => {
  if (!selectedFiles)
    return

  for (const file of selectedFiles) {
    filesData.value.push({
      file,
      url: useObjectUrl(file).value ?? '',
    })
  }
})

useDropZone(dropZoneRef, onDrop)

const getFilesData = () => filesData.value.map((f:any) => f.file)
defineExpose({ getFilesData })
</script>
<template>
  <div class="border-dashed border border-primary rounded bg-gray dark:bg-meta-4" ref="dropZoneRef"
    @click="() => open()">
    <div v-if="filesData.length" class="h-50 p-3 flex items-center gap-5 flex items-center justify-center">
      <div v-for="(file, index) in filesData" :key="index" class="text-center">
        <img :src="file.url" alt="" width="150">
        <p>{{file.file.name}}</p>
        <button class="mt-2 text-black hover:border-b border-black dark:text-white dark:border-white"
          @click.stop="filesData.splice(index, 1)">Remove</button>
      </div>
    </div>
    <div class="my-auto h-40 flex items-center justify-center p-3" v-else>
      <p class="md:text-xl text-md">Drag 'n' drop some files here, or click to select files</p>
    </div>
  </div>

</template>
<style scoped></style>