<template>
  <button
    @click="buttonClicked"
    class="flex items-center justify-center gap-2 rounded-md p-2 transition duration-100 active:scale-95 disabled:active:scale-100"
    :class="dynamicClass"
    :disabled="loading"
  >
    <slot></slot>
    <slot name="icon" v-if="!loading"></slot>
    <BaseLoading v-else />
  </button>
</template>

<script>
import { computed, onUnmounted, ref, watch } from "vue";
export default {
  props: ["type", "isLoading", "url", "fileName", "class"],
  setup(props) {
    const loading = ref(false);
    const buttonStyle = ref({
      primary: "bg-teal-500 hover:bg-teal-600 text-white disabled:bg-teal-600",
      secondary:
        "bg-slate-500 hover:bg-slate-600 text-white disabled:bg-slate-600",
      outline:
        "border-2 border-inherit hover:bg-black/30 text-inherit disabled:bg-black/40",
    });

    const dynamicClass = computed(() => {
      return `${buttonStyle.value[props.type || "primary"]} ${
        props.class ? props.class : ""
      }`;
    });

    // Can use loading state from props
    const stop = watch(props, (newVal) => {
      loading.value = newVal.isLoading;
    });

    const download = async (targetUrl, fileName) => {
      const res = await fetch(targetUrl);
      const blobOject = await res.blob();
      const href = URL.createObjectURL(blobOject);

      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = fileName;

      document.body.appendChild(anchor);
      anchor.click();

      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(href);
    };

    const buttonClicked = async () => {
      if (!props.url || loading.value) return;
      loading.value = true;
      // Disabled all buttons if one is currently used so users don't click all download buttons at the sametime
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach((btn) => {
        btn.setAttribute("disabled", true);
      });
      await new Promise((r) => setTimeout(r, 1000));
      await download(props.url, props.fileName);
      allButtons.forEach((btn) => {
        btn.removeAttribute("disabled");
      });
      loading.value = false;
    };

    onUnmounted(() => {
      stop();
    });
    return { dynamicClass, buttonClicked, loading, download };
  },
};
</script>
