// Slideshow
const slideshow = document.querySelector("#slideshow");
const slideshowImages = document.querySelectorAll("#slideshow img");
const prevImage = document.querySelector("#prev-image");
const nextImage = document.querySelector("#next-image");
const currentImage = document.querySelector("#current-img");
// Download Buttons
const downloadImageBtn = document.querySelector("#download-image");
const downloadAudioBtn = document.querySelector('#download-audio')
const downloadAllImageBtn = document.querySelector("#download-all-image");
let lastImage = 0;

downloadImageBtn.addEventListener("click", () => {
  downloadImageBtn.setAttribute("disabled", true);
  download(slideshowImages[lastImage].src,downloadAllImageBtn.dataset.filename)
    .then(() => {
      console.log(`Success download ${downloadAllImageBtn.dataset.filename}`);
      downloadImageBtn.removeAttribute("disabled");
    })
    .catch(() =>
      console.error(`Failed to download ${downloadAllImageBtn.dataset.filename}`)
    );
});

downloadAudioBtn.addEventListener('click', ()=>{
    downloadAudioBtn.setAttribute('disabled', true)
    download(downloadAudioBtn.dataset.src, downloadAudioBtn.dataset.filename)
    .then(()=>{
        console.log(`Success download ${downloadAudioBtn.dataset.filename}`)
        downloadAudioBtn.removeAttribute('disabled')
    })
    .catch(()=> console.error(`Failed to download ${downloadAudioBtn.dataset.filename}`))
})

downloadAllImageBtn.addEventListener('click', ()=>{
    downloadAllImageBtn.setAttribute('disabled', true)
    slideshowImages.forEach((img, key) =>{
        download(img.src, `${downloadAllImageBtn.dataset.filename}_${key}.jpg`)
        .then(()=> console.log(`Success download ${downloadAllImageBtn.dataset.filename}_${key}.jpg`))
        .catch(()=> console.error(`Failed to download ${downloadAllImageBtn.dataset.filename}_${key}.jpg`))
    })
    downloadAllImageBtn.removeAttribute('disabled')
})

// Disabled download button if user scroll the slideshow
slideshow.addEventListener("scroll", () => {
  prevImage.setAttribute("disabled", true);
  nextImage.setAttribute("disabled", true);
  downloadImageBtn.setAttribute("disabled", true);
});

slideshow.addEventListener("scrollend", () => {
  prevImage.removeAttribute("disabled");
  nextImage.removeAttribute("disabled");
  downloadImageBtn.removeAttribute("disabled");

  lastImage = Math.floor(slideshow.scrollLeft / slideshow.clientWidth);
  nextImage.classList.remove("hidden");
  prevImage.classList.remove("hidden");
  currentImage.textContent = `${lastImage + 1}/${slideshowImages.length}`;
  if (lastImage === 0) {
    prevImage.classList.add("hidden");
  } else if (lastImage === slideshowImages.length - 1) {
    nextImage.classList.add("hidden");
  }
});

prevImage.addEventListener("click", () => {
  if (lastImage === 0) return;
  lastImage--;
  nextImage.classList.remove("hidden");
  slideshow.scrollLeft = slideshow.clientWidth * lastImage;
  currentImage.textContent = `${lastImage + 1}/${slideshowImages.length}`;
  if (lastImage === 0) {
    prevImage.classList.add("hidden");
  }
});

nextImage.addEventListener("click", () => {
  if (lastImage === slideshowImages.length - 1) return;
  lastImage++;
  prevImage.classList.remove("hidden");
  slideshow.scrollLeft = slideshow.clientWidth * lastImage;
  currentImage.textContent = `${lastImage + 1}/${slideshowImages.length}`;
  if (lastImage === slideshowImages.length - 1) {
    nextImage.classList.add("hidden");
  }
});
