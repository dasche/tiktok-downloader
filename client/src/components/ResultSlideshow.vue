<template>
  <div
    class="mx-auto grid max-w-sm grid-cols-1 gap-2 rounded-lg border bg-white p-2 shadow-md dark:border-none dark:bg-slate-700 md:max-w-full md:grid-cols-2"
  >
    <div>
      <Carousel>
        <Slide v-for="(image, index) in slideshow.details.images" :key="image">
          <div class="relative aspect-[3/4] overflow-hidden rounded-lg">
            <span
              class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-300/50"
              >{{ index + 1 }}</span
            >
            <BaseButton
              type="primary"
              :url="image"
              :fileName="`${slideshow.details.video_id}_${index}.jpg`"
              class="absolute bottom-2 right-2 h-10 w-10"
            >
              <template #icon>
                <i class="fa-solid fa-download"></i>
              </template>
            </BaseButton>
            <img class="h-full w-full object-cover" :src="image" />
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>

    <div class="flex flex-col gap-1 md:p-2">
      <div class="flex flex-col gap-2">
        <BaseButton
          type="secondary"
          :fileName="slideshow.details.video_id + '.mp3'"
          :url="slideshow.details.audio_url"
        >
          Download audio
          <template #icon>
            <i class="fa-solid fa-music"></i>
          </template>
        </BaseButton>
      </div>
      <h3
        class="break-words text-lg font-semibold text-teal-500"
        :title="'@' + slideshow.owner_username"
      >
        By
        <a
          :href="'https://tiktok.com/@' + slideshow.owner_username"
          target="_blank"
          >@{{ slideshow.owner_username }}</a
        >
      </h3>
      <p
        class="overflow-y-auto rounded-md bg-slate-300 p-2 dark:bg-slate-600 md:max-h-[18ch]"
      >
        {{ slideshow.details.desc }}
      </p>
      <div class="flex justify-evenly p-2">
        <span
          ><i class="fa-solid fa-play"></i>
          {{ slideshow.details.total_views }}</span
        >
        <span
          ><i class="fa-solid fa-heart"></i>
          {{ slideshow.details.total_likes }}</span
        >
        <span
          ><i class="fa-solid fa-comment"></i>
          {{ slideshow.details.total_comment }}</span
        >
        <span
          ><i class="fa-solid fa-share"></i>
          {{ slideshow.details.total_share }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  props: ["slideshow"],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
};
</script>
