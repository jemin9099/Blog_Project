<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { authHeaders } from '@/common/index.js'
import axios from 'axios';
const target = ref(null)
const categoryList = ref()
const sidebarStore = useSidebarStore()

onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})

const menuGroups = ref([
  {
    name: 'MENU',
    menuItems: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none" ><title>home-outline</title><path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22" /></svg>`,
        label: 'Home',
        route: '/',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="fill-current" 
        // width="22"
                  height="22"
                  viewBox="0 0 22 22"><title>view-dashboard-outline</title><path d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" /></svg>`,
        label: 'Categories',
        route: '/category'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg"   class="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"><title>post</title><path d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z" /></svg>`,
        label: 'Blogs',
        route: '/blogs'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" fill="none" width="22"
                  height="22" viewBox="0 0 22 22"><title>comment-outline</title><path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z" /></svg>`,
        label: 'Comments',
        route: '/comments',
        isAdmin:true
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" fill="none" width="22"
                  height="22" viewBox="0 0 22 22"><title>account-multiple-outline</title><path d="M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z" /></svg>`,
        label: 'Users',
        route: '/users'
      },
    ]
  }
])
const fetchCategories = async () => {
  const { data, status } = await axios.get(import.meta.env.VITE_API_BASE_URL + '/category/all', { headers: authHeaders })
  if (status === 200) {
    categoryList.value = data.data
    const sidebarCategory = { name: 'CATEGORIES', menuItems: [] }
    categoryList.value?.forEach(category => {
      sidebarCategory.menuItems.push({
        icon:  `<svg xmlns="http://www.w3.org/2000/svg" class="fill-current"  width="22" height="22" viewBox="0 0 22 22" fill="none"><title>circle-medium</title><path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" /></svg>`,
        label: category.name,
        route: '/category/' + category._id,
        isAdmin:true
      })
    });
    menuGroups.value.push(sidebarCategory)
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <aside
    class="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
    :class="{
      'translate-x-0': sidebarStore.isSidebarOpen,
      '-translate-x-full': !sidebarStore.isSidebarOpen
    }" ref="target">
    <!-- SIDEBAR HEADER -->
    <div class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
      <router-link to="/">
        <img src="@/assets/images/logo/logo.svg" alt="Logo" />
      </router-link>

      <button class="block lg:hidden" @click="sidebarStore.isSidebarOpen = false">
        <svg class="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
            fill="" />
        </svg>
      </button>
    </div>
    <!-- SIDEBAR HEADER -->

    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
      <!-- Sidebar Menu -->
      <nav class="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
        <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
          <div>
            <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2">{{ menuGroup.name }}</h3>

            <ul class="mb-6 flex flex-col gap-1.5">
              <SidebarItem v-for="(menuItem, index) in menuGroup.menuItems" :item="menuItem" :key="index"
                :index="index" />
            </ul>
          </div>
        </template>
      </nav>
      <!-- Sidebar Menu -->

      <!-- Promo Box -->
      <div
        class="mx-auto mb-10 w-full max-w-60 rounded-sm border border-strokedark bg-boxdark py-6 px-4 text-center shadow-default">
        <h3 class="mb-1 font-semibold text-white">TailAdmin Pro</h3>
        <p class="mb-4 text-xs">Get All Dashboards and 300+ UI Elements</p>
        <a href="https://tailadmin.com/pricing" target="_blank" rel="nofollow"
          class="flex items-center justify-center rounded-md bg-primary p-2 font-medium text-white hover:bg-opacity-90">
          Purchase Now
        </a>
      </div>
      <!-- Promo Box -->
    </div>
  </aside>
</template>
