<template>
  <header>
    <div class="container">
      <div class="flex items-center justify-between py-4">
        <a href="/" class="text-2xl font-black bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent"><i class="fa-brands fa-tiktok"></i> Downloader</a>
        <div class="text-3xl text-slate-500 flex gap-2">
            <a href="https://github.com/siyosu/tiktok-downloader" class="transition hover:text-teal-500"><i class="fa-brands fa-github"></i></a>
            <button class="hover:text-teal-500 transition" @click="toggleTheme"><i class="fa-solid fa-lightbulb dark:hidden"></i><i class="fa-regular fa-lightbulb hidden dark:inline"></i></button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {ref} from 'vue'
export default{
  setup(){
    const darkTheme = ref(false)
    
    const toggleTheme = ()=>{
      darkTheme.value = !darkTheme.value
      localStorage.setItem('theme', darkTheme.value)
      document.querySelector('html').classList.toggle('dark')
    }

    darkTheme.value = JSON.parse(localStorage.getItem('theme')) || false
    if(darkTheme.value){
      document.querySelector('html').classList.add('dark')
    }

    return {toggleTheme}
  }
}
</script>