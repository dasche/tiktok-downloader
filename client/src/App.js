import { ref } from "vue";

const getData = () => {
  const contentData = ref(null);
  const contentType = ref("");
  const errorMessage = ref("");
  const isLoading = ref(false);
  const apiEndpoint = '/api';
  const shortLink = /https:\/\/(?:vt|vm)\.tiktok\.com\/[A-Za-z0-9_-]+/;
  const webUrl = /https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)/;

  const abbreviateNumber = (number) => {
    const SI_SYMBOLS = ["", "k", "m", "b"];
    if (number < 1000) {
      return number.toString();
    }
    const exp = Math.floor(Math.log10(number) / 3);
    const abbreviated = (number / Math.pow(1000, exp)).toFixed(1);
    return abbreviated + SI_SYMBOLS[exp];
  };

  const searchVideo = async (targetUrl) => {
    errorMessage.value = "";

    // Validate input
    const invalidInput =
      targetUrl.length < 1 ||
      (!shortLink.test(targetUrl) && !webUrl.test(targetUrl));
    if (invalidInput) {
      errorMessage.value = "Please input a valid TikTok URL!";
      return;
    }

    // Cannot do another request unless the previous one is complete
    if (isLoading.value) return;
    isLoading.value = true;
    contentData.value = null;
    contentType.value = "";

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: targetUrl }),
      }).then((res) => res.json());

      if (res.status !== "ok") {
        // res = {status, message}
        throw res;
      }
      // res = {status, result}
      contentData.value = res.result;
      contentData.value.details.total_comment = abbreviateNumber(
        contentData.value.details.total_comment,
      );
      contentData.value.details.total_likes = abbreviateNumber(
        contentData.value.details.total_likes,
      );
      contentData.value.details.total_share = abbreviateNumber(
        contentData.value.details.total_share,
      );
      contentData.value.details.total_views = abbreviateNumber(
        contentData.value.details.total_views,
      );
      contentType.value = contentData.value.type;
    } catch (error) {
      errorMessage.value = error.message;
    }

    isLoading.value = false;
  };
  return { contentData, errorMessage, searchVideo, isLoading, contentType };
};

export default getData;
