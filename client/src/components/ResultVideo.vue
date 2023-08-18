<template>
  <div
    class="mx-auto grid max-w-sm grid-cols-1 gap-2 rounded-lg border bg-white p-2 shadow-md dark:border-none dark:bg-slate-700 md:max-w-full md:grid-cols-2"
  >
    <div class="aspect-[3/4] overflow-hidden rounded-lg">
      <img
        class="h-full w-full object-cover"
        :src="video.details.cover"
        alt=""
      />
    </div>
    <div class="flex flex-col gap-1 md:p-2">
      <div class="flex flex-col gap-2">
        <BaseButton
          type="primary"
          :fileName="video.details.video_id + '.mp4'"
          :url="video.details.video_url"
        >
          Download video
          <template #icon>
            <i class="fa-solid fa-film"></i>
          </template>
        </BaseButton>
        <BaseButton
          type="secondary"
          :fileName="video.details.video_id + '.mp3'"
          :url="video.details.audio_url"
        >
          Download audio
          <template #icon>
            <i class="fa-solid fa-music"></i>
          </template>
        </BaseButton>
        <BaseButton
          type="outline"
          :fileName="video.details.video_id + '.jpg'"
          :url="video.details.cover"
        >
          Download cover
          <template #icon>
            <i class="fa-solid fa-image"></i>
          </template>
        </BaseButton>
      </div>
      <h3
        class="break-words text-lg font-semibold text-teal-500"
        :title="'@' + video.owner_username"
      >
        By
        <a :href="'https://tiktok.com/@' + video.owner_username" target="_blank"
          >@{{ video.owner_username }}</a
        >
      </h3>
      <p
        class="overflow-y-auto rounded-md bg-slate-300 p-2 dark:bg-slate-600 md:max-h-[18ch]"
      >
        {{ video.details.desc }}
      </p>
      <div class="flex justify-evenly p-2">
        <span
          ><i class="fa-solid fa-play"></i>
          {{ video.details.total_views }}</span
        >
        <span
          ><i class="fa-solid fa-heart"></i>
          {{ video.details.total_likes }}</span
        >
        <span
          ><i class="fa-solid fa-comment"></i>
          {{ video.details.total_comment }}</span
        >
        <span
          ><i class="fa-solid fa-share"></i>
          {{ video.details.total_share }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["video"],
};
</script>
