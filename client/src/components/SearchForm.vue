<template>
  <form @submit.prevent="search" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="target" class="font-medium">Video / Slideshow URL</label>
      <input
        type="url"
        name="target"
        id="target"
        placeholder="https://"
        class="rounded-md border p-2 outline-none focus:ring-2 focus:ring-teal-200"
        :class="
          isError ? errorClass : 'dark:border-slate-500 dark:bg-slate-700'
        "
        v-model.trim="targetUrl"
      />
      <span v-if="isError" class="text-sm text-red-500"
        >Please input a valid TikTok URL!</span
      >
    </div>
    <BaseButton :isLoading="isLoading" type="primary">
      <template #icon>
        <i class="fa-solid fa-magnifying-glass"></i>
      </template>
      Search
    </BaseButton>
  </form>
</template>

<script>
import { onUnmounted, ref, watch } from "vue";
export default {
  props: ["isLoading"],
  setup(_, context) {
    const targetUrl = ref("");
    const isError = ref(false);
    const errorClass = "border-red-500 bg-red-100 text-red-500 animate-shake";
    const shortLink = /https:\/\/(?:vt|vm)\.tiktok\.com\/[A-Za-z0-9_-]+/;
    const webUrl = /https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)/;

    const stop = watch(targetUrl, () => {
      isError.value = false;
    });

    const search = () => {
      isError.value = false;
      const invalidInput =
        targetUrl.value.length < 1 ||
        (!shortLink.test(targetUrl.value) && !webUrl.test(targetUrl.value));
      if (invalidInput) {
        isError.value = true;
        return;
      }
      context.emit("search", targetUrl.value);
    };

    onUnmounted(() => {
      stop();
    });

    return { targetUrl, search, errorClass, isError };
  },
};
</script>
