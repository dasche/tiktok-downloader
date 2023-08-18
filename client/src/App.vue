<template>
  <Header />
  <main class="mt-6 min-h-[80vh]">
    <div class="container md:max-w-[700px]">
      <div class="flex flex-col gap-4">
        <BaseAlert
          v-if="errorMessage"
          type="failed"
          title="Oops!"
          :message="errorMessage"
          v-motion-roll-top
        />
        <a
          @click.prevent="clearData"
          href="/"
          v-if="contentData"
          class="text-lg font-medium text-teal-500"
          ><i class="fa-solid fa-arrow-left"></i> Back</a
        >
        <ResultVideo
          v-if="contentType === 'video'"
          :video="contentData"
          v-motion-slide-left
          :delay="100"
        />
        <ResultSlideshow
          v-else-if="contentType === 'slideshow'"
          v-motion-slide-left
          :slideshow="contentData"
          :delay="100"
        />

        <template v-if="!contentData">
          <SearchForm
            v-motion-slide-left
            @search="searchVideo"
            :isLoading="isLoading"
          />
          <TutorialCard v-motion-slide-left :delay="100" />
        </template>
      </div>
    </div>
  </main>
  <Footer />
</template>

<script>
import getData from "./App";

// Components
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import SearchForm from "./components/SearchForm.vue";
import TutorialCard from "./components/TutorialCard.vue";
import ResultVideo from "./components/ResultVideo.vue";
import ResultSlideshow from "./components/ResultSlideshow.vue";

export default {
  components: {
    Header,
    Footer,
    SearchForm,
    TutorialCard,
    ResultVideo,
    ResultSlideshow,
  },
  setup() {
    const { contentData, errorMessage, searchVideo, isLoading, contentType } =
      getData();
    const clearData = () => {
      contentData.value = null;
      contentType.value = "";
    };

    return {
      contentData,
      errorMessage,
      searchVideo,
      isLoading,
      contentType,
      clearData,
    };
  },
};
</script>
