<template>
  <div
    v-if="showAlert"
    class="relative flex flex-col gap-2 rounded-md p-4 text-white"
    :class="bgColor[type || 'default']"
  >
    <button @click="closeAlert" class="absolute right-3 top-1">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
    <span class="flex items-center justify-between text-lg font-semibold">{{
      title
    }}</span>
    <span class="text-sm">{{ message }}</span>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["type", "title", "message"],
  setup() {
    const showAlert = ref(true);
    const bgColor = ref({
      default: "bg-sky-500",
      success: "bg-teal-500",
      failed: "bg-red-500",
    });
    const closeAlert = () => {
      showAlert.value = false;
    };
    return { bgColor, showAlert, closeAlert };
  },
};
</script>
